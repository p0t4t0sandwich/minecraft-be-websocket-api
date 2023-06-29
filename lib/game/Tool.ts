import { Item } from "./Item.js";

// Tool interface
interface Tool extends Item {
    enchantments: [];
    freeStackSize: number;
    maxStackSize: number;
    stackSize: number;
}

export { Tool }
