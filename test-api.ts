
import { getCharacters, getEpisodes } from './src/lib/rickmorty';

async function testAPI() {
  try {
    console.log("Testing getCharacters...");
    const characters = await getCharacters(1);
    if (characters.results.length > 0) {
      console.log("✅ getCharacters success!");
    } else {
      console.error("❌ getCharacters returned empty results");
    }

    console.log("Testing getEpisodes...");
    const episodes = await getEpisodes(1);
    if (episodes.results.length > 0) {
      console.log("✅ getEpisodes success!");
    } else {
      console.error("❌ getEpisodes returned empty results");
    }

  } catch (error) {
    console.error("❌ API Test Failed:", error);
  }
}

testAPI();
