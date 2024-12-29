import { Helmet } from "react-helmet-async";
import Cover from "../../../Shared/Cover/Cover";
import menuImg from '../../../assets/menu/banner3.jpg';
const Manu = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menuImg} title={'Our menu'} ></Cover>
          
        </div>
    );
};

export default Manu;