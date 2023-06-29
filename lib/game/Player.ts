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

export { Player }
