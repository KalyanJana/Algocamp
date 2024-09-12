

import Level1 from '../../assets/Images/Level1.JPG'
import Level2 from '../../assets/Images/Level2.JPG'
import Level3 from '../../assets/Images/Level3.JPG'
import Level4 from '../../assets/Images/Level4.JPG'
import Level5 from '../../assets/Images/Level5.JPG'
import Level6 from '../../assets/Images/Level6.JPG'
import Level7 from '../../assets/Images/Level7.JPG'
import Level8 from '../../assets/Images/Level8.JPG'
import Level9 from '../../assets/Images/Level9.JPG'


function HangMan( { step }) {
    const images = [Level1, Level2, Level3, Level4, Level5, Level6, Level7, Level8];

    return (
        <div className='w-[300px] h-[300px]'> 
            <img 
                src={step >= images.length ? images[images.length - 1] : images[step]}
            />
        </div>
    )
}

export default HangMan;