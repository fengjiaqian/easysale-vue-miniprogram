import storage from "common/storage";
export function refreshTabPages() {
    storage.set("homeRefresh", true);
    storage.set("mineRefresh", true);
    storage.set("orderRefresh", true);
}