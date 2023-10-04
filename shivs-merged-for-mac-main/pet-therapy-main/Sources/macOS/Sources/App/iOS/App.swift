import Schwifty
import SwiftUI

@main
struct MyApp: App {
    // swiftlint:disable:next weak_delegate
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    init() {
        Dependencies.setup()
        Logger.isEnabled = true
        Logger.log("MyApp", "Init")
        Tracking.setup()
    }

    var body: some Scene {
        MainScene()
    }
}

class AppDelegate: NSObject, UIApplicationDelegate {
    @Inject private var commandLine: CommandLineUseCase
    @Inject private var onScreen: OnScreenCoordinator
    
    private let tag = "AppDelegate"
    
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
    ) -> Bool {
        Logger.log(tag, "Did finish launching")
        commandLine.handleCommandLineArgs()
        onScreen.show()
        return true
    }
}
