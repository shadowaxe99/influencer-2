import Schwifty
import Speech
import AVFoundation
import Speech
import AVFoundation
import SwiftUI
import Speech
import AVFoundation
import SwiftUI
import Speech
import AVFoundation

struct PetDetailsHeader: View {
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    init() {
        self.speechRecognizer = SpeechRecognizer()
        self.speechSynthesizer = AVSpeechSynthesizer()
    }
    @Binding var isRecording: Bool
    @Binding var recognizedText: String
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    @Binding var isRecording: Bool
    @Binding var recognizedText: String
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    @Binding var isRecording: Bool
    @Binding var recognizedText: String
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    @Binding var isRecording: Bool
    @Binding var recognizedText: String
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    @Binding var isRecording: Bool
    @Binding var recognizedText: String
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    @Binding var isRecording: Bool
    @Binding var recognizedText: String
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    @Binding var isRecording: Bool
    @Binding var recognizedText: String
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    @Binding var isRecording: Bool
    @Binding var recognizedText: String
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    @Binding var isRecording: Bool
    @Binding var recognizedText: String
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    @Binding var isRecording: Bool
    @Binding var recognizedText: String
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    @Binding var isRecording: Bool
    @Binding var recognizedText: String
    private let speechRecognizer: SpeechRecognizer
    private let speechSynthesizer: AVSpeechSynthesizer

    @State private var isRecording = false
    @State private var recognizedText = ""
    private let speechRecognizer = SpeechRecognizer()
    private let speechSynthesizer = AVSpeechSynthesizer()

    @EnvironmentObject var viewModel: PetDetailsView
    @EnvironmentObject var speechRecognizerModel: SpeechRecognizerModel
    @EnvironmentObject var deletePet: DeletePetButtonCoordinator
    @EnvironmentObject var exportPet: ExportPetButtonCoordinator
    @EnvironmentObject var renamePet: RenamePetButtonCoordinator
        
    var body: some View {
        HStack(spacing: .xl) {
            Text(viewModel.title)
                .font(.boldTitle)
                .multilineTextAlignment(.leading)
                .onAppear(perform: speakText)
                .font(.boldTitle)
                .multilineTextAlignment(.leading)
                .onAppear(perform: speakText)
                .font(.boldTitle)
                .multilineTextAlignment(.leading)
                .onAppear(perform: speakText)
                .font(.boldTitle)
                .multilineTextAlignment(.leading)
                .onAppear(perform: speakText)
                .font(.boldTitle)
                .multilineTextAlignment(.leading)
                .onAppear(perform: speakText)
                .font(.boldTitle)
                .multilineTextAlignment(.leading)
                .onAppear(perform: speakText)
                .font(.boldTitle)
                .multilineTextAlignment(.leading)
            
            if DeviceRequirement.macOS.isSatisfied {
                Spacer()
                renamePet.view(for: viewModel.species)
                deletePet.view(for: viewModel.species) { deleted in
                    if deleted {
                        viewModel.close()
                    }
                }
                exportPet.view(for: viewModel.species)
            }
        }
    }
}
