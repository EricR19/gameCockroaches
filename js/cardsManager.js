const food = 'FOOD';
const faces = 'FACES';
const flags = 'FLAGS';
const animals = 'ANIMALS';
const heroes = 'HEROES';

export const THEME_TYPE = {
    FOOD: food,
    FACES: faces,
    FLAGS: flags,
    ANIMALS: animals,
    HEROES: heroes
}

const foodIcons = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🫛', '🥬', '🥒', '🌶', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🫚', '🥔', '🍠', '🫘', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🍼', '🫖', '🍵', '🧃', '🥤', '🧋', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍹', '🍾', '🧊', '🥡'];

const facesIcons = ['😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '🥹', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '🙂‍', '😏', '😒', '🙂‍', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😮‍💨', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🫣', '🤗', '🫡', '🤔', '🫢', '🤭', '🤫', '🤥', '😶', '😶‍🌫️', '😐', '😑', '😬', '🫨', '🫠', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '😵‍💫', '🫥', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];

const flagsIcons = ['🏳️', '🏴', '🏁', '🚩', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️', '🇦🇫', '🇦🇽', '🇦🇱', '🇩🇿', '🇦🇸', '🇦🇩', '🇦🇴', '🇦🇮', '🇦🇺', '🇦🇹', '🇧🇭', '🇧🇩', '🇧🇧', '🇧🇪', '🇧🇿', '🇧🇯', '🇧🇹', '🇧🇴', '🇧🇦', '🇧🇼', '🇧🇷', '🇮🇴', '🇧🇳', '🇧🇬', '🇧🇫', '🇧🇮', '🇰🇭', '🇨🇦', '🇮🇨', '🇨🇻', '🇧🇶', '🇰🇾', '🇹🇩', '🇨🇱', '🇨🇳', '🇨🇽', '🇨🇷', '🇨🇮', '🇭🇷', '🇨🇺', '🇨🇼', '🇨🇾', '🇨🇿'];

const animalsIcons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐢', '🐦‍⬛', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', '🪳', '🦟', '🦗'];

const heroesImages = ['TM01-001.png', 'TM01-002.png', 'TM01-003.png', 'TM01-004.png', 'TM01-005.png', 'TM01-006.png', 'TM01-007.png', 'TM01-008.png', 'TM01-009.png', 'TM01-010.png', 'TM01-011.png', 'TM01-012.png', 'TM01-013.png', 'TM01-014.png', 'TM01-015.png', 'TM01-016.png', 'TM01-017.png', 'TM01-018.png', 'TM01-019.png', 'TM01-020.png', 'TM01-021.png', 'TM01-022.png', 'TM01-023.png', 'TM01-024.png'];


export class CardsManager {
    constructor() {

    }

    getCards(theme, difficulty) {
        let cards = [];
        switch (theme) {
            case THEME_TYPE.FOOD:
                cards = this.getCardsFromIconList(foodIcons, difficulty);
                break;
            case THEME_TYPE.FACES:
                cards = this.getCardsFromIconList(facesIcons, difficulty);
                break;
            case THEME_TYPE.FLAGS:
                cards = this.getCardsFromIconList(flagsIcons, difficulty);
                break;
            case THEME_TYPE.ANIMALS:
                cards = this.getCardsFromIconList(animalsIcons, difficulty);
                break;
            case THEME_TYPE.HEROES:
                cards = this.getCardsFromIconList(heroesImages, difficulty);
                break;
            default:
                break;
        }
        console.log('cards', cards);

        return JSON.stringify({ 'cards': cards });
    }

    getCardsFromIconList(list, quantity) {

        let iconIndexes = [];
        for (let i = 0; i < quantity; i++) {
            let iconIndex = this.getUniqueIndex(0, list.length, iconIndexes);
            iconIndexes.push(iconIndex);
        }

        let cards = [];
        for (let i = 0; i < iconIndexes.length; i++) {
            let icon = list[iconIndexes[i]];
            let card = {
                "isDiscovered": false,
                "icon": icon,
                "id": i
            };
            cards.push(card);
        }

        let cardsDuplicate = cards.slice();
        cards = cards.concat(cardsDuplicate);
        this.shuffle(cards);

        return cards;
    }

    getUniqueIndex(min, max, iconIndexes) {
        const newIndex = this.generateRandomIndex(min, max);

        for (let i = 0; i < iconIndexes.length; i++) {
            if (newIndex === iconIndexes[i]) {
                return this.getUniqueIndex(min, max, iconIndexes);
            }
        }
        return newIndex;
    }

    generateRandomIndex(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1))
    }

    shuffle(array) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }
}