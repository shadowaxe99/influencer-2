import Combine
import NotAGif
import Schwifty
import requests
import SwiftUI
import Yage

protocol PetDetailsHeaderBuilder {
    func build(with viewModel: PetDetailsViewModel) -> AnyView
}

class PetDetailsViewModel: ObservableObject {

    func sendVoiceCommand(_ command: String) {
        let url = URL(string: "http://localhost:8000/interpreter/parse")!
        let parameters: [String: Any] = [
            "voice_command": command
        ]
        let headers: [String: String] = [
            "Content-Type": "application/json"
        ]

        AF.request(url, method: .post, parameters: parameters, encoding: JSONEncoding.default, headers: headers)
            .responseJSON { response in
                switch response.result {
                case .success(let value):
                    print(value)
                case .failure(let error):
                    print(error)
                }
            }
    }
    @Inject private var appConfig: AppConfig
    @Inject private var assets: PetsAssetsProvider
    @Inject private var names: SpeciesNamesRepository
    @Inject private var headerBuilder: PetDetailsHeaderBuilder
    
    @Binding var isShown: Bool
    @Published var title: String = ""
    
    let species: Species
    let speciesAbout: String
    var canRemove: Bool { isSelected }
    var canSelect: Bool { !isSelected }
    var isSelected: Bool { appConfig.isSelected(species.id) }

    var animationFrames: [ImageFrame] {
        assets.images(for: species.id, animation: "front")
    }

    var animationFps: TimeInterval {
        max(3, species.fps)
    }
    
    private var disposables = Set<AnyCancellable>()

    init(isShown: Binding<Bool>, species: Species) {
        self._isShown = isShown
        self.speciesAbout = Lang.Species.about(for: species.id)
        self.species = species
        self.bindTitle()
    }
    
    func close() {
        withAnimation {
            isShown = false
        }
    }

    func selected() {
        appConfig.select(species.id)
        Tracking.didSelect(species.id)
        close()
    }

    func remove() {
        appConfig.deselect(species.id)
        Tracking.didRemove(species.id)
        close()
    }
    
    func didAppear() {
        Tracking.didEnterDetails(
            species: species.id,
            name: species.id,
            price: nil,
            purchased: false
        )
    }
    
    private func bindTitle() {
        names.name(forSpecies: species.id)
            .sink { [weak self] name in self?.title = name }
            .store(in: &disposables)
    }
}
