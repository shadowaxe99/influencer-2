import SwiftUI
import Speech
import AVFoundation

struct ContentView: View {

    let speechRecognizer = SFSpeechRecognizer()
    let audioEngine = AVAudioEngine()
    let speechSynthesizer = AVSpeechSynthesizer()
    var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
    var recognitionTask: SFSpeechRecognitionTask?

    func recordAndRecognizeSpeech() {
        let node = audioEngine.inputNode
let recordingFormat = node.outputFormat(forBus: 0)
recognitionRequest = SFSpeechAudioBufferRecognitionRequest()
node.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { (buffer, _) in
    self.recognitionRequest?.append(buffer)
}
audioEngine.prepare()
do {
    try audioEngine.start()
} catch {
    return print(error)
}
recognitionTask = speechRecognizer?.recognitionTask(with: recognitionRequest!, resultHandler: { (result, error) in
    if let result = result {
        let speech = result.bestTranscription.formattedString
        print(speech)
    } else if let error = error {
        print(error)
    }
})
    }

    func speakText(text: String) {
        let speechUtterance = AVSpeechUtterance(string: text)
speechSynthesizer.speak(speechUtterance)
    }

    var body: some View {
        func sendVoiceCommandToBackend(voiceCommand: String) {
    // Implementation of sending voice command to backend will go here
}

// Your existing SwiftUI view code will go here
    }
}
