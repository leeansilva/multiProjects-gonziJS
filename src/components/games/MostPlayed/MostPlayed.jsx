
import CardAvatarSlider from '../CardAvatarSlider/CardAvatarSlider';
import Slider from '../Slider/Slider';
import './style.css';


function MostPlayed() {
  return (
    <div className='MostPlayed__container'>
      <div className='MP__MostPlay__container'>
        <h2 className='MP__MostPlay__h2'>MOST PLAYED</h2>
        <Slider/>
      </div>
      <div className='MP__MostPlay__container'>
        <h2 className='MP__MostPlay__h2 Best'>BEST PLAYERS</h2>
        <CardAvatarSlider/>
      </div>
    </div>
  );
}

export default MostPlayed;