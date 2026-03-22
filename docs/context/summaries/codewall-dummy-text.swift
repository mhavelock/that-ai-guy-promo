
// MARK: — AudioSessionManager.swift [ThatAIGuy v3.2.1 / build 2847]
AVAudioSession.sharedInstance()
  .setCategory(.playAndRecord, mode: .measurement,
    options: [.defaultToSpeaker, .allowBluetooth, .allowBluetoothA2DP])
  .setActive(true, options: .notifyOthersOnDeactivation)
sampleRate: 44100.0 Hz   ioBufferDuration: 0.005208 s   channels: 1
AVAudioFormat pcmFloat32 @44.1kHz  mono  interleaved:false

let engine = AVAudioEngine()
let inputNode = engine.inputNode
let recordingFormat = inputNode.outputFormat(forBus: 0)
inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat)
  { [weak self] buffer, _ in
    self?.recognitionRequest.append(buffer)
  }

// AudioBufferList memory layout
ptr: 0x00007f9a4c201020   capacity: 1   mNumberBuffers: 1
  mData: 0x00007f9a4c3a0000   mDataByteSize: 4096

// MARK: — SpeechRecognitionCoordinator.swift
SFSpeechRecognizer(locale: Locale(identifier: "en-GB"))
  .isAvailable              → true
  .supportsOnDevice         → false
  .defaultTaskHint          → .dictation

SFSpeechAudioBufferRecognitionRequest()
  .shouldReportPartialResults   = true
  .requiresOnDeviceRecognition  = false
  .taskHint                     = .dictation
  .contextualStrings            = ["pedantry", "flagellate", "epistemological",
    "condescending", "remonstrate", "supercilious", "tautological"]

// Recognition task state machine
enum RecognitionState { case idle, listening, processing, transmitting, error }
  idle        → 0x00   listening    → 0x01   processing   → 0x02
  transmitting → 0x03   error        → 0xFF   retry limit: 3

// NLP: multi-scheme token classification
NLTagger(tagSchemes: [.tokenType, .language, .lexicalClass, .sentimentScore])
  .dominantLanguage → NLLanguage("en")
  .tags(unit: .word, options: [.joinNames, .omitWhitespace])

tagDistribution (n=847): noun 0.387  verb 0.214  adj 0.163  adv 0.071
sentimentScore → -0.74   dominance: 0.31   arousal: 0.66   valence: -0.82
Russell circumplex: quadrant IV (hostile / low-pleasure)

// MARK: — LLMGateway.swift
var request = URLRequest(url: URL(string: endpoint)!)
request.httpMethod         = "POST"
request.timeoutInterval    = 30.0
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.setValue("Bearer \(apiKey)", forHTTPHeaderField: "Authorization")



let payload: [String: Any] = [
  "model": "gpt-4o-mini",   "temperature": 0.92,   "max_tokens": 180,
  "stream": false,   "system": "[REDACTED — Configuration.plist → LLMSystemPrompt]",
  "messages": [["role": "user", "content": buildPrompt(from: transcript)]]
]

// Response schema
struct LLMResponse: Codable {
  let id: String      // "chatcmpl-9zBxK4…"
  let object: String   // "chat.completion"
  let created: Int     // epoch timestamp
  let model: String    // "gpt-4o-mini-2024-07-18"
  let usage: Usage     // prompt:42 completion:67 total:109
  struct Choice: Codable {
    let finishReason: String   // "stop" | "length" | "content_filter"
    let message: Message
  }
}

// MARK: — CoreML offline fallback
let config = MLModelConfiguration()
config.computeUnits                       = .cpuAndNeuralEngine
config.allowLowPrecisionAccumulationOnGPU = true
config.preferredMetalDevice               = MTLCreateSystemDefaultDevice()
let model = try ThatAIGuy_Retort_v1(configuration: config)
let prediction = try model.prediction(text_input: transcript, sentiment_vector: vector)

// Inference buffer memory layout
0x00007fff5bc4a210  [MLMultiArray] Float32[1×128]  refcount:2  pinned:true
0x00007fff5bc4a2f0  [MLMultiArray] Float32[1×256]  refcount:1  pinned:true
0x00007fff5bc4a3d0  [NSString]     UTF-8  len:94     refcount:4  tagged:false
0x00007fff5bc4a450  [NSData]        bytes:3712          refcount:1  mmap:true

// Threading model
DispatchQueue.global(qos: .userInitiated)  →  recognition + NLP pipeline
DispatchQueue.global(qos: .background)     →  LLM HTTP transport + retry
DispatchQueue.global(qos: .utility)        →  CoreML inference (fallback)
DispatchQueue.main                        →  UI updates + TTS dispatch

// TTS — AVSpeechSynthesizer
let utterance = AVSpeechUtterance(string: response)
utterance.voice                             = AVSpeechSynthesisVoice(language: "en-GB")
utterance.rate                              = 0.48  // default: 0.50
utterance.pitchMultiplier                   = 1.1
utterance.postUtteranceDelay                = 0.4

// Build configuration — Release
SWIFT_OPTIMIZATION_LEVEL        = -O
ENABLE_BITCODE                  = NO
SWIFT_STRICT_CONCURRENCY        = complete
OTHER_SWIFT_FLAGS               = -Xfrontend -enable-actor-data-race-checks
MARKETING_VERSION               = 1.0.0
CURRENT_PROJECT_VERSION         = 2847
