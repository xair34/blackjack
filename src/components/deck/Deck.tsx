import cardBack from '../../assets/svg_playing_cards/backs/red2.svg';
import '../../style.scss';
import { Card } from '../../types/card';


const Deck = ({ currentDeck }: { currentDeck: Card[] }) => {
    return (
        <>
            {
                currentDeck.map((card, i) => (
                    <img src={cardBack} key={i} className='card' />
                ))
            }
            
        </>
    );

};


export default Deck;
