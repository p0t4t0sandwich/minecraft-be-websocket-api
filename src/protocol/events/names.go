package events

// EventName enum
type EventName string

const (
	AdditionalContentLoaded           EventName = "AdditionalContentLoaded"
	AgentCommand                      EventName = "AgentCommand"
	AgentCreated                      EventName = "AgentCreated"
	ApiInit                           EventName = "ApiInit"
	AppPaused                         EventName = "AppPaused"
	AppResumed                        EventName = "AppResumed"
	AppSuspended                      EventName = "AppSuspended"
	AwardAchievement                  EventName = "AwardAchievement"
	BlockBroken                       EventName = "BlockBroken"
	BlockPlaced                       EventName = "BlockPlaced"
	BoardTextUpdated                  EventName = "BoardTextUpdated"
	BookEdited                        EventName = "BookEdited"
	BookExported                      EventName = "BookExported"
	BookImageImported                 EventName = "BookImageImported"
	BossKilled                        EventName = "BossKilled"
	CameraUsed                        EventName = "CameraUsed"
	CauldronUsed                      EventName = "CauldronUsed"
	ChunkChanged                      EventName = "ChunkChanged"
	ChunkLoaded                       EventName = "ChunkLoaded"
	ChunkUnloaded                     EventName = "ChunkUnloaded"
	ConfigurationChanged              EventName = "ConfigurationChanged"
	ConnectionFailed                  EventName = "ConnectionFailed"
	CraftingSessionCompleted          EventName = "CraftingSessionCompleted"
	CraftingSessionEnd                EventName = "CraftingSessionEnd"
	CraftingSessionStart              EventName = "CraftingSessionStart"
	EndOfDay                          EventName = "EndOfDay"
	EntitySpawned                     EventName = "EntitySpawned"
	FileTransmissionCancelled         EventName = "FileTransmissionCancelled"
	FileTransmissionCompleted         EventName = "FileTransmissionCompleted"
	FileTransmissionStarted           EventName = "FileTransmissionStarted"
	FirstTimeClientOpen               EventName = "FirstTimeClientOpen"
	FocusGained                       EventName = "FocusGained"
	FocusLost                         EventName = "FocusLost"
	GameplayTipShown                  EventName = "GameplayTipShown"
	GameRulesLoaded                   EventName = "GameRulesLoaded"
	GameRulesUpdated                  EventName = "GameRulesUpdated"
	GameSessionComplete               EventName = "GameSessionComplete"
	GameSessionStart                  EventName = "GameSessionStart"
	GameTypeChanged                   EventName = "GameTypeChanged"
	GrindstoneBlockUsed               EventName = "GrindstoneBlockUsed"
	HardwareInfo                      EventName = "HardwareInfo"
	HasNewContent                     EventName = "HasNewContent"
	ItemAcquired                      EventName = "ItemAcquired"
	ItemCrafted                       EventName = "ItemCrafted"
	ItemDestroyed                     EventName = "ItemDestroyed"
	ItemDropped                       EventName = "ItemDropped"
	ItemEnchanted                     EventName = "ItemEnchanted"
	ItemEquipped                      EventName = "ItemEquipped"
	ItemInteracted                    EventName = "ItemInteracted"
	ItemNamed                         EventName = "ItemNamed"
	ItemSmelted                       EventName = "ItemSmelted"
	ItemUsed                          EventName = "ItemUsed"
	JoinCanceled                      EventName = "JoinCanceled"
	JukeboxUsed                       EventName = "JukeboxUsed"
	LicenseCensus                     EventName = "LicenseCensus"
	MascotCreated                     EventName = "MascotCreated"
	MenuShown                         EventName = "MenuShown"
	MobInteracted                     EventName = "MobInteracted"
	MobKilled                         EventName = "MobKilled"
	MultiplayerConnectionStateChanged EventName = "MultiplayerConnectionStateChanged"
	MultiplayerRoundEnd               EventName = "MultiplayerRoundEnd"
	MultiplayerRoundStart             EventName = "MultiplayerRoundStart"
	NpcPropertiesUpdated              EventName = "NpcPropertiesUpdated"
	OptionsUpdated                    EventName = "OptionsUpdated"
	performanceMetrics                EventName = "performanceMetrics"
	PackImportStage                   EventName = "PackImportStage"
	PlayerBounced                     EventName = "PlayerBounced"
	PlayerDied                        EventName = "PlayerDied"
	PlayerJoin                        EventName = "PlayerJoin"
	PlayerLeave                       EventName = "PlayerLeave"
	PlayerMessage                     EventName = "PlayerMessage"
	PlayerTeleported                  EventName = "PlayerTeleported"
	PlayerTransform                   EventName = "PlayerTransform"
	PlayerTravelled                   EventName = "PlayerTravelled"
	PlayerSaved                       EventName = "PlayerSaved"
	PortalBuilt                       EventName = "PortalBuilt"
	PortalUsed                        EventName = "PortalUsed"
	PortfolioExported                 EventName = "PortfolioExported"
	PotionBrewed                      EventName = "PotionBrewed"
	PurchaseAttempt                   EventName = "PurchaseAttempt"
	PurchaseResolved                  EventName = "PurchaseResolved"
	RegionalPopup                     EventName = "RegionalPopup"
	RespondedToAcceptContent          EventName = "RespondedToAcceptContent"
	ScreenChanged                     EventName = "ScreenChanged"
	ScreenHeartbeat                   EventName = "ScreenHeartbeat"
	SignInToEdu                       EventName = "SignInToEdu"
	SignInToXboxLive                  EventName = "SignInToXboxLive"
	SignOutOfXboxLive                 EventName = "SignOutOfXboxLive"
	SpecialMobBuilt                   EventName = "SpecialMobBuilt"
	StartClient                       EventName = "StartClient"
	StartWorld                        EventName = "StartWorld"
	TextToSpeechToggled               EventName = "TextToSpeechToggled"
	UgcDownloadCompleted              EventName = "UgcDownloadCompleted"
	UgcDownloadStarted                EventName = "UgcDownloadStarted"
	UploadSkin                        EventName = "UploadSkin"
	VehicleExited                     EventName = "VehicleExited"
	WorldExported                     EventName = "WorldExported"
	WorldFilesListed                  EventName = "WorldFilesListed"
	WorldGenerated                    EventName = "WorldGenerated"
	WorldLoaded                       EventName = "WorldLoaded"
	WorldUnloaded                     EventName = "WorldUnloaded"

	SignedBookOpened                             EventName = "SignedBookOpened"
	CommandBlockEdited                           EventName = "CommandBlockEdited"
	MobBorn                                      EventName = "MobBorn"
	PetDied                                      EventName = "PetDied"
	FishBucketed                                 EventName = "FishBucketed"
	BellBlockUsed                                EventName = "BellBlockUsed"
	PatternRemoved                               EventName = "PatternRemoved"
	EntityInteracted                             EventName = "EntityInteracted"
	CauldronBlockUsed                            EventName = "CauldronBlockUsed"
	ComposterBlockUsed                           EventName = "ComposterBlockUsed"
	SlashCommandExecuted                         EventName = "SlashCommandExecuted"
	Respawn                                      EventName = "Respawn"
	Storage                                      EventName = "Storage"
	Heartbeat                                    EventName = "Heartbeat"
	ScriptRan                                    EventName = "ScriptRan"
	SignInEdu                                    EventName = "SignInEdu"
	BlockFound                                   EventName = "BlockFound"
	BookCopied                                   EventName = "BookCopied"
	JoinByCode                                   EventName = "JoinByCode"
	OfferRated                                   EventName = "OfferRated"
	PackPlayed                                   EventName = "PackPlayed"
	AppUnpaused                                  EventName = "AppUnpaused"
	DwellerDied                                  EventName = "DwellerDied"
	RealmShared                                  EventName = "RealmShared"
	SkinChanged                                  EventName = "SkinChanged"
	StackLoaded                                  EventName = "StackLoaded"
	StoreSearch                                  EventName = "StoreSearch"
	VideoPlayed                                  EventName = "VideoPlayed"
	AssertFailed                                 EventName = "AssertFailed"
	EntityDanced                                 EventName = "EntityDanced"
	LicenseCheck                                 EventName = "LicenseCheck"
	POIBlockUsed                                 EventName = "POIBlockUsed"
	PatternAdded                                 EventName = "PatternAdded"
	ScriptLoaded                                 EventName = "ScriptLoaded"
	ContentShared                                EventName = "ContentShared"
	DifficultySet                                EventName = "DifficultySet"
	LevelDestruct                                EventName = "LevelDestruct"
	PopupFiredEdu                                EventName = "PopupFiredEdu"
	StorageReport                                EventName = "StorageReport"
	TreatmentsSet                                EventName = "TreatmentsSet"
	WorldImported                                EventName = "WorldImported"
	BehaviorFailed                               EventName = "BehaviorFailed"
	CaravanChanged                               EventName = "CaravanChanged"
	DevConsoleOpen                               EventName = "DevConsoleOpen"
	TradeCompleted                               EventName = "TradeCompleted"
	ArmorStandPosed                              EventName = "ArmorStandPosed"
	BarrelBlockUsed                              EventName = "BarrelBlockUsed"
	BehaviorErrored                              EventName = "BehaviorErrored"
	ClientIdCreated                              EventName = "ClientIdCreated"
	LabTableCreated                              EventName = "LabTableCreated"
	PackHashChanged                              EventName = "PackHashChanged"
	PlayerMessageMe                              EventName = "PlayerMessageMe"
	IncognitoFailure                             EventName = "IncognitoFailure"
	LecternBlockUsed                             EventName = "LecternBlockUsed"
	MobEffectChanged                             EventName = "MobEffectChanged"
	PlayerMessageSay                             EventName = "PlayerMessageSay"
	CampfireBlockUsed                            EventName = "CampfireBlockUsed"
	DevConsoleCommand                            EventName = "DevConsoleCommand"
	FloatPropertyList                            EventName = "FloatPropertyList"
	PackImportStarted                            EventName = "PackImportStarted"
	PlayerMessageChat                            EventName = "PlayerMessageChat"
	PlayerMessageTell                            EventName = "PlayerMessageTell"
	RealmUrlGenerated                            EventName = "RealmUrlGenerated"
	StoreOfferClicked                            EventName = "StoreOfferClicked"
	TreatmentsCleared                            EventName = "TreatmentsCleared"
	LevelDatLoadFailed                           EventName = "LevelDatLoadFailed"
	PackUpgradeAttempt                           EventName = "PackUpgradeAttempt"
	PerformanceMetrics                           EventName = "PerformanceMetrics"
	PlayerMessageTitle                           EventName = "PlayerMessageTitle"
	SearchItemSelected                           EventName = "SearchItemSelected"
	SplitScreenUpdated                           EventName = "SplitScreenUpdated"
	StructureGenerated                           EventName = "StructureGenerated"
	EntitlementListInfo                          EventName = "EntitlementListInfo"
	NewUserPackDetected                          EventName = "NewUserPackDetected"
	PurchaseGameAttempt                          EventName = "PurchaseGameAttempt"
	ReducerBlockEntered                          EventName = "ReducerBlockEntered"
	BlockPlacedByCommand                         EventName = "BlockPlacedByCommand"
	CartographyBlockUsed                         EventName = "CartographyBlockUsed"
	ExperimentalGameplay                         EventName = "ExperimentalGameplay"
	POIBlockUsageAttempt                         EventName = "POIBlockUsageAttempt"
	SearchCatalogRequest                         EventName = "SearchCatalogRequest"
	TreatmentPackApplied                         EventName = "TreatmentPackApplied"
	TreatmentPackRemoved                         EventName = "TreatmentPackRemoved"
	UnknownBlockReceived                         EventName = "UnknownBlockReceived"
	FileTransmissionState                        EventName = "FileTransmissionState"
	HowToPlayTopicChanged                        EventName = "HowToPlayTopicChanged"
	PackImportedCompleted                        EventName = "PackImportedCompleted"
	ArmorStandItemEquipped                       EventName = "ArmorStandItemEquipped"
	CompoundCreatorCreated                       EventName = "CompoundCreatorCreated"
	DefaultGameTypeChanged                       EventName = "DefaultGameTypeChanged"
	ElementConstructorUsed                       EventName = "ElementConstructorUsed"
	PurchaseFailureDetails                       EventName = "PurchaseFailureDetails"
	PushNotificationOpened                       EventName = "PushNotificationOpened"
	RealmMemberlistCleared                       EventName = "RealmMemberlistCleared"
	AppConfigurationChanged                      EventName = "AppConfigurationChanged"
	SetValidForAchievements                      EventName = "SetValidForAchievements"
	TreatmentPackDownloaded                      EventName = "TreatmentPackDownloaded"
	MultiplayerSessionUpdate                     EventName = "MultiplayerSessionUpdate"
	PushNotificationReceived                     EventName = "PushNotificationReceived"
	TrialDeviceIdCorrelation                     EventName = "TrialDeviceIdCorrelation"
	ContentLogsInWorldSession                    EventName = "ContentLogsInWorldSession"
	CopyWorldEducationEnabled                    EventName = "CopyWorldEducationEnabled"
	StoreOfferPurchaseAttempt                    EventName = "StoreOfferPurchaseAttempt"
	StoreOfferPurchaseFailure                    EventName = "StoreOfferPurchaseFailure"
	PushNotificationPermission                   EventName = "PushNotificationPermission"
	StoreOfferPurchaseResolved                   EventName = "StoreOfferPurchaseResolved"
	StorePromotionNotification                   EventName = "StorePromotionNotification"
	SetMultiplayerCorrelationId                  EventName = "SetMultiplayerCorrelationId"
	PromotionNotificationClicked                 EventName = "PromotionNotificationClicked"
	NewStoreContentCheckCompleted                EventName = "NewStoreContentCheckCompleted"
	WorldHistoryPackSourceMissingDuringUpgrade   EventName = "WorldHistoryPackSourceMissingDuringUpgrade"
	FixedMarketplaceWorldUsingV2VillagersToUseV1 EventName = "FixedMarketplaceWorldUsingV2VillagersToUseV1"
	EduOptionSet                                 EventName = "EduOptionSet"
	EduResources                                 EventName = "EduResources"
	StructureExport                              EventName = "StructureExport"
	CodeBuilderClosed                            EventName = "CodeBuilderClosed"
	ChatSettingsUpdated                          EventName = "ChatSettingsUpdated"
	CodeBuilderDownload                          EventName = "CodeBuilderDownload"
	ControlRemappedByPlayer                      EventName = "ControlRemappedByPlayer"
	EduiOSPurchaseTransaction                    EventName = "EduiOSPurchaseTransaction"

	Unknown          EventName = "Unknown"
	WebSocketConnect EventName = "WebSocketConnect"
)
