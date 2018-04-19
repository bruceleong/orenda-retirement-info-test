import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import { Link } from 'react-router-dom'

import React from 'react'

const AppDrawerLoggedOut = (props) => (
  <div>
    <Drawer
      docked={false}
      width={200}
      open={props.open}
      onRequestChange={props.handleClose}
    >
      <List>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <ListItem primaryText="SBSF Home" onClick={props.handleClose} />
        </Link>
        <Link to="/Contact" style={{ textDecoration: 'none' }}>
          <ListItem primaryText="Contact" onClick={props.handleClose} />
        </Link>
      </List>
    </Drawer>
  </div>
)

export default AppDrawerLoggedOut


// export default class AppDrawerLoggedOut extends Component {
//   render() {
//     return (

//       <div>
//         <Drawer
//           docked={false}
//           width={200}
//           open={this.props.open}
//           onRequestChange={this.props.handleClose}
//         >
//           <List>
//             <Link to="/" style={{ textDecoration: "none" }}>
//               <ListItem primaryText="SBSF Home" onClick={this.props.handleClose} />
//             </Link>
//             <Link to="/Contact" style={{ textDecoration: "none" }}>
//               <ListItem primaryText="Contact" onClick={this.props.handleClose} />
//             </Link>
//           </List>
//         </Drawer>
//       </div>
//     );
//   }
// }

// <Link to={"/NormsRestaurant"} style={{textDecoration: "none"}}>
// <ListItem primaryText="Norms Restaurant (test)" onClick={this.props.handleClose} />
// </Link>
