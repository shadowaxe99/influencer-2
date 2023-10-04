import Combine
import Schwifty
import SwiftUI
import Yage

class PetsSelectionViewModel: ObservableObject {
    @Inject private var appConfig: AppConfig
    @Inject private var assets: PetsAssetsProvider
    @Inject private var speciesProvider: SpeciesProvider
    
    @Published var openSpecies: Species?
    @Published var selectedSpecies: [Species] = []
    @Published var unselectedSpecies: [Species] = []
    @Published var canShowDiscordBanner: Bool = true
    @Published private var selectedTag: String?

    lazy var showingDetails: Binding<Bool> = Binding {
        self.openSpecies != nil
    } set: { isShown in
        guard !isShown else { return }
        Task { @MainActor in
            self.openSpecies = nil
        }
    }

    var gridColums: [GridItem] {
        [.init(.adaptive(minimum: 100, maximum: 140), spacing: itemsSpacing)]
    }
    
    private var itemsSpacing: CGFloat {
        let spacing: Spacing = DeviceRequirement.iOS.isSatisfied ? .md : .lg
        return spacing.rawValue
    }
    
    private let importPet = ImportPetDragAndDropCoordinator()

    private var disposables = Set<AnyCancellable>()

    init() {
        bindPets()
    }
    
    private func bindPets() {
        Publishers.CombineLatest3(
            speciesProvider.all(),
            appConfig.$selectedSpecies,
            $selectedTag
        )
        .receive(on: DispatchQueue.main)
        .sink { [weak self] all, selectedIds, tag in
            self?.loadPets(all: all, selectedIds: selectedIds, tag: tag)
        }
        .store(in: &disposables)
    }
    
    func filterChanged(to tag: String?) {
        selectedTag = tag
    }

    func showDetails(of species: Species?) {
        openSpecies = species
    }

    func closeDetails() {
        openSpecies = nil
    }

    func isSelected(_ species: Species) -> Bool {
        appConfig.isSelected(species.id)
    }
    
    func importView() -> AnyView {
        importPet.view()
    }

    private func loadPets(all: [Species], selectedIds: [String], tag: String?) {
        let selected = selectedIds.compactMap { speciesProvider.by(id: $0) }
        selectedSpecies = selected
        unselectedSpecies = all.filter { tag == nil || $0.tags.contains(tag ?? "") }
    }
}
