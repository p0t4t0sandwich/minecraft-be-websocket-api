// Type definitions for Minecraft Bedrock Edition Events

import { MessageBody } from "../messages/Messages.js";

// Notes:
// Gathered from various packet dumps. Not all events are tested.
// If the event you want doesn't have a type, use BedrockEvent,
// then if possible, create a PR and add it to the type definitions.

// EventName enum
export enum EventName {
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

// EventHeader interface
interface EventHeader {
    eventName: EventName;
    messagePurpose: "event";
    version: number;
}

// EventBody type
interface EventBody extends MessageBody {
    [key: string]: any;
}

// Event interface
export class BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: EventBody;
}

// Block interface
interface Block {
    aux: number;
    id: string;
    namespace: "minecraft" | string;
}

// Player interface
interface Player {
    color: string;
    dimension: number;
    id: number;
    name: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    type: "minecraft:player" | string;
    variant: number;
    yRot: number;
}

// Item interface
interface Item {
    aux: number;
    id: string;
    namespace: "minecraft" | string;
}

// Tool interface
interface Tool extends Item {
    enchantments: [];
    freeStackSize: number;
    maxStackSize: number;
    stackSize: number;
}


// Event response interfaces

// BlockBrokenEvent
interface BlockBrokenBody extends EventBody {
    block: Block,
    count: number,
    destructionMethod: string,
    player: Player,
    tool: Tool,
    variant: number
}

export class BlockBrokenEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: BlockBrokenBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <BlockBrokenBody>event.body;
    }
}

// BlockPlacedEvent
interface BlockPlacedBody extends EventBody {
    block: Block,
    count: number,
    placedUnderwater: boolean,
    placementMethod: number,
    player: Player,
    tool: Tool
}

export class BlockPlacedEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: BlockPlacedBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <BlockPlacedBody>event.body;
    }
}

// ItemUsedEvent
interface ItemUsedBody extends EventBody {
    count: number,
    item: Item,
    player: Player,
    useMethod: number
}

export class ItemUsedEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: ItemUsedBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <ItemUsedBody>event.body;
    }
}

// PlayerJoinEvent
interface PlayerJoinBody extends EventBody {
    player: Player;
}

export class PlayerJoinEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: PlayerJoinBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <PlayerJoinBody>event.body;
    }
}

// PlayerLeaveEvent
interface PlayerLeaveBody extends EventBody {
    player: Player;
}

export class PlayerLeaveEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: PlayerLeaveBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <PlayerLeaveBody>event.body;
    }
}

// PlayerMessageEvent
interface PlayerMessageBody extends EventBody {
    message: string;
    sender: string;
    receiver: string;
    type: "chat" | "tell" | string;
}

export class PlayerMessageEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: PlayerMessageBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <PlayerMessageBody>event.body;
    }
}

// PlayerTransformEvent
interface PlayerTransformBody extends EventBody {
    player: Player;
}

export class PlayerTransformEvent extends BedrockEvent {
    // Properties
    server: string;
    header: EventHeader;
    body: PlayerTransformBody;

    // Constructor
    constructor(server: string, event: BedrockEvent) {
        super();
        this.server = server;
        this.header = event.header;
        this.body = <PlayerTransformBody>event.body;
    }
}
