import { TagsDb } from "@/services/tagsDb";
import { Tag } from "@/types/Tag";
import { create } from "zustand";

type TagStore = {
  tags: Tag[];
  loadTags: () => Promise<void>;
  addTag: (tagName: string) => Promise<void>;
  updateTag: (tag: Tag) => Promise<void>;
  removeTag: (id: number) => Promise<void>;
};

const useTagStore = create<TagStore>((set) => ({
  tags: [],
  loadTags: async () => {
    const results = await TagsDb.getAll();
    set({ tags: results });
  },
  addTag: async (tagName: string) => {
    await TagsDb.add(tagName);
    await useTagStore.getState().loadTags();
  },
  updateTag: async (tag: Tag) => {
    await TagsDb.update(tag);
    await useTagStore.getState().loadTags();
  },
  removeTag: async (id: number) => {
    await TagsDb.remove(id);
    set((state) => ({ tags: state.tags.filter((t) => t.id !== id) }));
  },
}));

export default useTagStore;
