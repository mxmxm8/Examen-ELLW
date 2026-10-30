const API_BASE_URL = "http://localhost:3000/api/onepiece/characters";
const CHARACTERS_PER_PAGE = 10;

let currentPage = 1;
const capturedPirates = new Map();


async function getCharacters(page = 1, limit = CHARACTERS_PER_PAGE) {
    const url = `${API_BASE_URL}?page=${page}&limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : (data.data || data.results || data.characters || []);
}

function getCharacterName(character) {
    if (!character) return "Desconegut";
    if (typeof character.name === "string") return character.name;
    if (typeof character.name === "object" && character.name !== null) {
        return character.name.en || character.name.romaji || character.name.jp || "Sense nom";
    }
    return "Sense nom";
}