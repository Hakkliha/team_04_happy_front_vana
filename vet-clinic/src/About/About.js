import React from "react";
import "./About.css";
import lorenz_pic from "../resources/lorenz_pic.jpg";
import andero_pic from  "../resources/andero_pic.jpg";
import liisi_pic from  "../resources/liisi_pic.jpg";

class About extends React.Component {
    render() {
        return (
            <div className="main-content-about">
                <h1>About</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras enim eros, dictum ut dapibus sit amet, volutpat ac neque. Integer at rhoncus quam. Aliquam erat volutpat. Morbi at fermentum dui. Aenean in est felis. Aenean accumsan ac lorem in tincidunt. Nulla convallis ac metus sit amet interdum. Etiam ac fringilla libero.

                    Nulla ut venenatis diam. Proin porttitor arcu a purus suscipit, id condimentum quam viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In et tempus tellus, ac convallis nisi. In mollis sapien ac accumsan porta. Morbi mi ligula, tristique vitae dapibus vitae, imperdiet vel tortor. Aliquam at ante sollicitudin, rhoncus risus non, egestas felis. Nunc cursus nec eros et lacinia. Proin eu placerat dui, faucibus ullamcorper nunc. Nunc porta cursus pulvinar.
                </p>
                <div>
                    <h2>The Team</h2>
                    <div className="team-lineup">
                        <div className="team-member-profile">
                            <h3>Lorenz Ernits</h3>
                            <img src={lorenz_pic} className="team-member-image" alt="Lorenz"/>
                            <h4>Front-End Developer</h4>
                        </div>
                        <div className="team-member-profile">
                            <h3>Andero Raava</h3>
                            <img src={andero_pic} className="team-member-image" alt="Andero"/>
                            <h4>Back-End Developer</h4>
                        </div>
                        <div className="team-member-profile">
                            <h3>Liisi Nõojärv</h3>
                            <img src={liisi_pic} className="team-member-image" alt="Liisi"/>
                            <h4>Back-End Tester</h4>
                        </div>
                    </div>
                </div>
                <p>
                    Morbi ut magna sit amet ipsum efficitur rutrum. Pellentesque at dui ut massa tincidunt tempor. Vivamus tincidunt est id urna viverra, quis maximus tortor condimentum. Curabitur efficitur diam sed sem pharetra, in dapibus magna euismod. Integer hendrerit erat ac feugiat cursus. Fusce massa risus, eleifend a sem a, euismod placerat arcu. Maecenas ullamcorper, est ut pellentesque molestie, dolor urna ullamcorper dolor, in posuere risus elit ut dolor. Pellentesque at commodo diam. In vel leo sed quam commodo lobortis. Etiam venenatis consectetur congue. Donec vulputate, mi quis elementum cursus, lacus justo porttitor tortor, eu feugiat purus nunc interdum sapien. Vivamus vitae massa malesuada, ornare turpis ut, gravida mauris.

                </p>
            </div>
        )
    }
}

export default About;