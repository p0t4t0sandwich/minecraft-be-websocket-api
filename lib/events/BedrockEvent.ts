/**
 * @author p0t4t0sandwich
 * @description Generic event packet
 */

import { MessageBody } from "../messages/Messages.js";

/**
 * @enum EventName
 * @description An enum of all the events that can be sent by the server. Gathered from various packet dumps. Not all events are tested. If the event you want doesn't have a type, use BedrockEvent, then if possible, create a PR and add it to the type definitions.
 */
enum EventName {
    AdditionalContentLoaded = "AdditionalContentLoaded",
    AgentCommand = "AgentCommand",
    AgentCreated = "AgentCreated",
    ApiInit = "ApiInit",
    AppPaused = "AppPaused",
    AppResumed = "AppResumed",
    AppSuspended = "AppSuspended",
    AwardAchievement = "AwardAchievement",
    BlockBroken = "BlockBroken",
    BlockPlaced = "BlockPlaced",
    BoardTextUpdated = "BoardTextUpdated",
    BookEdited = "BookEdited",
    BookExported = "BookExported",
    BookImageImported = "BookImageImported",
    BossKilled = "BossKilled",
    CameraUsed = "CameraUsed",
    CauldronUsed = "CauldronUsed",
    ChunkChanged = "ChunkChanged",
    ChunkLoaded = "ChunkLoaded",
    ChunkUnloaded = "ChunkUnloaded",
    ConfigurationChanged = "ConfigurationChanged",
    ConnectionFailed = "ConnectionFailed",
    CraftingSessionCompleted = "CraftingSessionCompleted",
    CraftingSessionEnd = "CraftingSessionEnd",
    CraftingSessionStart = "CraftingSessionStart",
    EndOfDay = "EndOfDay",
    EntitySpawned = "EntitySpawned",
    FileTransmissionCancelled = "FileTransmissionCancelled",
    FileTransmissionCompleted = "FileTransmissionCompleted",
    FileTransmissionStarted = "FileTransmissionStarted",
    FirstTimeClientOpen = "FirstTimeClientOpen",
    FocusGained = "FocusGained",
    FocusLost = "FocusLost",
    GameplayTipShown = "GameplayTipShown",
    GameRulesLoaded = "GameRulesLoaded",
    GameRulesUpdated = "GameRulesUpdated",
    GameSessionComplete = "GameSessionComplete",
    GameSessionStart = "GameSessionStart",
    GameTypeChanged = "GameTypeChanged",
    GrindstoneBlockUsed = "GrindstoneBlockUsed",
    HardwareInfo = "HardwareInfo",
    HasNewContent = "HasNewContent",
    ItemAcquired = "ItemAcquired",
    ItemCrafted = "ItemCrafted",
    ItemDestroyed = "ItemDestroyed",
    ItemDropped = "ItemDropped",
    ItemEnchanted = "ItemEnchanted",
    ItemEquipped = "ItemEquipped",
    ItemInteracted = "ItemInteracted",
    ItemNamed = "ItemNamed",
    ItemSmelted = "ItemSmelted",
    ItemUsed = "ItemUsed",
    JoinCanceled = "JoinCanceled",
    JukeboxUsed = "JukeboxUsed",
    LicenseCensus = "LicenseCensus",
    MascotCreated = "MascotCreated",
    MenuShown = "MenuShown",
    MobInteracted = "MobInteracted",
    MobKilled = "MobKilled",
    MultiplayerConnectionStateChanged = "MultiplayerConnectionStateChanged",
    MultiplayerRoundEnd = "MultiplayerRoundEnd",
    MultiplayerRoundStart = "MultiplayerRoundStart",
    NpcPropertiesUpdated = "NpcPropertiesUpdated",
    OptionsUpdated = "OptionsUpdated",
    performanceMetrics = "performanceMetrics",
    PackImportStage = "PackImportStage",
    PlayerBounced = "PlayerBounced",
    PlayerDied = "PlayerDied",
    PlayerJoin = "PlayerJoin",
    PlayerLeave = "PlayerLeave",
    PlayerMessage = "PlayerMessage",
    PlayerTeleported = "PlayerTeleported",
    PlayerTransform = "PlayerTransform",
    PlayerTravelled = "PlayerTravelled",
    PlayerSaved = "PlayerSaved",
    PortalBuilt = "PortalBuilt",
    PortalUsed = "PortalUsed",
    PortfolioExported = "PortfolioExported",
    PotionBrewed = "PotionBrewed",
    PurchaseAttempt = "PurchaseAttempt",
    PurchaseResolved = "PurchaseResolved",
    RegionalPopup = "RegionalPopup",
    RespondedToAcceptContent = "RespondedToAcceptContent",
    ScreenChanged = "ScreenChanged",
    ScreenHeartbeat = "ScreenHeartbeat",
    SignInToEdu = "SignInToEdu",
    SignInToXboxLive = "SignInToXboxLive",
    SignOutOfXboxLive = "SignOutOfXboxLive",
    SpecialMobBuilt = "SpecialMobBuilt",
    StartClient = "StartClient",
    StartWorld = "StartWorld",
    TextToSpeechToggled = "TextToSpeechToggled",
    UgcDownloadCompleted = "UgcDownloadCompleted",
    UgcDownloadStarted = "UgcDownloadStarted",
    UploadSkin = "UploadSkin",
    VehicleExited = "VehicleExited",
    WorldExported = "WorldExported",
    WorldFilesListed = "WorldFilesListed",
    WorldGenerated = "WorldGenerated",
    WorldLoaded = "WorldLoaded",
    WorldUnloaded = "WorldUnloaded",

    SignedBookOpened = "SignedBookOpened",
    CommandBlockEdited = "CommandBlockEdited",
    MobBorn = "MobBorn",
    PetDied = "PetDied",
    FishBucketed = "FishBucketed",
    BellBlockUsed = "BellBlockUsed",
    PatternRemoved = "PatternRemoved",
    EntityInteracted = "EntityInteracted",
    CauldronBlockUsed = "CauldronBlockUsed",
    ComposterBlockUsed = "ComposterBlockUsed",
    SlashCommandExecuted = "SlashCommandExecuted",
    Respawn = "Respawn",
    Storage = "Storage",
    Heartbeat = "Heartbeat",
    ScriptRan = "ScriptRan",
    SignInEdu = "SignInEdu",
    BlockFound = "BlockFound",
    BookCopied = "BookCopied",
    JoinByCode = "JoinByCode",
    OfferRated = "OfferRated",
    PackPlayed = "PackPlayed",
    AppUnpaused = "AppUnpaused",
    DwellerDied = "DwellerDied",
    RealmShared = "RealmShared",    
    SkinChanged = "SkinChanged",
    StackLoaded = "StackLoaded",
    StoreSearch = "StoreSearch",
    VideoPlayed = "VideoPlayed",
    AssertFailed = "AssertFailed",
    EntityDanced = "EntityDanced",
    LicenseCheck = "LicenseCheck",
    POIBlockUsed = "POIBlockUsed",
    PatternAdded = "PatternAdded",
    ScriptLoaded = "ScriptLoaded",
    ContentShared = "ContentShared",
    DifficultySet = "DifficultySet",
    LevelDestruct = "LevelDestruct",
    PopupFiredEdu = "PopupFiredEdu",
    StorageReport = "StorageReport",
    TreatmentsSet = "TreatmentsSet",
    WorldImported = "WorldImported",
    BehaviorFailed = "BehaviorFailed",
    CaravanChanged = "CaravanChanged",
    DevConsoleOpen = "DevConsoleOpen",
    TradeCompleted = "TradeCompleted",
    ArmorStandPosed = "ArmorStandPosed",
    BarrelBlockUsed = "BarrelBlockUsed",
    BehaviorErrored = "BehaviorErrored",
    ClientIdCreated = "ClientIdCreated",
    LabTableCreated = "LabTableCreated",
    PackHashChanged = "PackHashChanged",
    PlayerMessageMe = "PlayerMessageMe",
    IncognitoFailure = "IncognitoFailure",
    LecternBlockUsed = "LecternBlockUsed",
    MobEffectChanged = "MobEffectChanged",
    PlayerMessageSay = "PlayerMessageSay",
    CampfireBlockUsed = "CampfireBlockUsed",
    DevConsoleCommand = "DevConsoleCommand",
    FloatPropertyList = "FloatPropertyList",
    PackImportStarted = "PackImportStarted",
    PlayerMessageChat = "PlayerMessageChat",
    PlayerMessageTell = "PlayerMessageTell",
    RealmUrlGenerated = "RealmUrlGenerated",
    StoreOfferClicked = "StoreOfferClicked",
    TreatmentsCleared = "TreatmentsCleared",
    LevelDatLoadFailed = "LevelDatLoadFailed",
    PackUpgradeAttempt = "PackUpgradeAttempt",
    PerformanceMetrics = "PerformanceMetrics",
    PlayerMessageTitle = "PlayerMessageTitle",
    SearchItemSelected = "SearchItemSelected",
    SplitScreenUpdated = "SplitScreenUpdated",
    StructureGenerated = "StructureGenerated",
    EntitlementListInfo = "EntitlementListInfo",
    NewUserPackDetected = "NewUserPackDetected",
    PurchaseGameAttempt = "PurchaseGameAttempt",
    ReducerBlockEntered = "ReducerBlockEntered",
    BlockPlacedByCommand = "BlockPlacedByCommand",
    CartographyBlockUsed = "CartographyBlockUsed",
    ExperimentalGameplay = "ExperimentalGameplay",
    POIBlockUsageAttempt = "POIBlockUsageAttempt",
    SearchCatalogRequest = "SearchCatalogRequest",
    TreatmentPackApplied = "TreatmentPackApplied",
    TreatmentPackRemoved = "TreatmentPackRemoved",
    UnknownBlockReceived = "UnknownBlockReceived",
    FileTransmissionState = "FileTransmissionState",
    HowToPlayTopicChanged = "HowToPlayTopicChanged",
    PackImportedCompleted = "PackImportedCompleted",
    ArmorStandItemEquipped = "ArmorStandItemEquipped",
    CompoundCreatorCreated = "CompoundCreatorCreated",
    DefaultGameTypeChanged = "DefaultGameTypeChanged",
    ElementConstructorUsed = "ElementConstructorUsed",
    PurchaseFailureDetails = "PurchaseFailureDetails",
    PushNotificationOpened = "PushNotificationOpened",
    RealmMemberlistCleared = "RealmMemberlistCleared",
    AppConfigurationChanged = "AppConfigurationChanged",
    SetValidForAchievements = "SetValidForAchievements",
    TreatmentPackDownloaded = "TreatmentPackDownloaded",
    MultiplayerSessionUpdate = "MultiplayerSessionUpdate",
    PushNotificationReceived = "PushNotificationReceived",
    TrialDeviceIdCorrelation = "TrialDeviceIdCorrelation",
    ContentLogsInWorldSession = "ContentLogsInWorldSession",
    CopyWorldEducationEnabled = "CopyWorldEducationEnabled",
    StoreOfferPurchaseAttempt = "StoreOfferPurchaseAttempt",
    StoreOfferPurchaseFailure = "StoreOfferPurchaseFailure",
    PushNotificationPermission = "PushNotificationPermission",
    StoreOfferPurchaseResolved = "StoreOfferPurchaseResolved",
    StorePromotionNotification = "StorePromotionNotification",
    SetMultiplayerCorrelationId = "SetMultiplayerCorrelationId",
    PromotionNotificationClicked = "PromotionNotificationClicked",
    NewStoreContentCheckCompleted = "NewStoreContentCheckCompleted",
    WorldHistoryPackSourceMissingDuringUpgrade = "WorldHistoryPackSourceMissingDuringUpgrade",
    FixedMarketplaceWorldUsingV2VillagersToUseV1 = "FixedMarketplaceWorldUsingV2VillagersToUseV1",
    EduOptionSet = "EduOptionSet",
    EduResources = "EduResources",
    StructureExport = "StructureExport",
    CodeBuilderClosed = "CodeBuilderClosed",
    ChatSettingsUpdated = "ChatSettingsUpdated",
    CodeBuilderDownload = "CodeBuilderDownload",
    ControlRemappedByPlayer = "ControlRemappedByPlayer",
    EduiOSPurchaseTransaction = "EduiOSPurchaseTransaction",
}

/**
 * @interface EventHeader
 * @description Event header interface
 * @property {EventName} eventName Event name
 * @property {string} messagePurpose Message purpose
 * @property {number} version Version
 */
interface EventHeader {
    eventName: EventName;
    messagePurpose: "event";
    version: number;
}

/**
 * @interface EventBody
 * @description Event body interface
 * @extends MessageBody
 * @property {any} [key: string] Any key
 */
interface EventBody extends MessageBody {
    [key: string]: any;
}


/**
 * @class BedrockEvent
 * @description Bedrock event class
 * @property {string} server Server
 * @property {EventHeader} header Event header
 * @property {EventBody} body Event body
 * @method getServer Get server
 * @method getHeader Get event header
 * @method getBody Get event body
 * @param {string} server Server
 * @param {EventHeader} header Event header
 * @param {EventBody} body Event body
 */
class BedrockEvent {
    server: string;
    header: EventHeader;
    body: EventBody;

    /**
     * @constructor
     * @param server The server the event is from
     * @param header The event header
     * @param body The event body
     * @description Create a new bedrock event
     * @memberof BedrockEvent
     */
    constructor(server: string, header: EventHeader, body: EventBody) {
        this.server = server;
        this.header = header;
        this.body = body;
    }

    /**
     * @method getServer
     * @description Get the server the event is from
     * @returns {string} The server the event is from
     * @memberof BedrockEvent
     */
    getServer(): string {
        return this.server;
    }

    /**
     * @method getHeader
     * @description Get the event header
     * @returns {EventHeader} The event header
     * @memberof BedrockEvent
     */
    getHeader(): EventHeader {
        return this.header;
    }

    /**
     * @method getBody
     * @description Get the event body
     * @returns {EventBody} The event body
     * @memberof BedrockEvent
     */
    getBody(): EventBody {
        return this.body;
    }
}

export { BedrockEvent, EventBody, EventName }
