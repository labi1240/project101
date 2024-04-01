import { DEMO_AUTHORS } from "./authors";
import __project from "./jsons/__project.json";
import { DEMO_CATEGORIES} from "./taxonomies";
import { ProjectDataType } from "./types";

const DEMO_PROJECTS_LISTINGS = __project.map((project): ProjectDataType => {
  // Map categories and authors similarly to how you've done with other listings
  const category = DEMO_CATEGORIES.find(c => c.id === project.listingCategoryId);
  const author = DEMO_AUTHORS.find(a => a.id === project.authorId);

  return {
    ...project,
    author: author || undefined, // Fallback to undefined if no matching author
    categories: category ? [category] : [], // Ensure categories is an array, even if empty
    // Add any additional mappings here as needed
  };
});

export { DEMO_PROJECTS_LISTINGS };
