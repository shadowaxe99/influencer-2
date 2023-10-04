import Combine
import Schwifty
import SwiftUI

struct MainScene: Scene {
    @Inject private var appConfig: AppConfig
    
    var body: some Scene {
        WindowGroup {
            MacContentView()
                .launchSilently(appConfig.launchSilently)
        }
    }
    
    static func show() {
        if let window = AppWindowManager.shared.current {
            window.makeKey()
            window.makeMain()
        } else {
            showMainWindow()
        }
        trackAppLaunched()
    }

    private static func showMainWindow() {
        let window = AppWindowManager.shared.build()
        AppWindowManager.shared.current = window
        window.show()
        window.makeKeyAndOrderFront(nil)
        window.becomeMain()
    }

    private static func trackAppLaunched() {
        @Inject var appConfig: AppConfig
        @Inject var launchAtLogin: LaunchAtLoginUseCase
        
        Tracking.didLaunchApp(
            bounceOffPets: appConfig.bounceOffPetsEnabled,
            gravityEnabled: appConfig.gravityEnabled,
            petSize: appConfig.petSize,
            launchAtLogin: launchAtLogin.isEnabled,
            selectedSpecies: appConfig.selectedSpecies
        )
    }
}

private extension View {
    func launchSilently(_ silent: Bool) -> some View {
        modifier(LaunchSilentlyMod(silent: silent))
    }
}

private struct LaunchSilentlyMod: ViewModifier {
    let silent: Bool
    
    func body(content: Content) -> some View {
        if silent {
            content.opacity(0).onWindow { $0.close() }
        } else {
            content
        }
    }
}

