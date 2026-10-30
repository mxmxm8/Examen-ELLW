const API_BASE_URL = "http://localhost:3000/api/onepiece/characters";
const CHARACTERS_PER_PAGE = 10;

let currentPage = 1;
const capturedPirates = new Map();

const FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%3E%3Crect%20fill%3D%22%231e293b%22%20width%3D%22200%22%20height%3D%22200%22%2F%3E%3Ctext%20fill%3D%22%2394a3b8%22%20font-family%3D%22sans-serif%22%20font-size%3D%2214%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20x%3D%22100%22%20y%3D%22105%22%3ESense%20Imatge%3C%2Ftext%3E%3C%2Fsvg%3E";


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

function getCharacterImage(character) {
    if (!character) return FALLBACK_IMAGE;
    return character.image_url || character.image || character.avatarSrc || character.picture || FALLBACK_IMAGE;
}

function getFirstActiveBounty(character) {
    if (!character || !Array.isArray(character.bounties)) return null;
    return character.bounties.find(b => b && (b.is_active === true || b.is_active === "true" || b.is_active === 1)) || null;
}

function parseBountyAmount(amount) {
    if (typeof amount === "number") return amount;
    if (typeof amount === "string") {
        const clean = amount.replace(/[^0-9.-]+/g, "");
        const parsed = parseFloat(clean);
        return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
}

