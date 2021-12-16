import R from "ramda";
import { connect } from "react-redux";
import NavigationBar from "./NavigationBar";

const mapStateToProps = R.pick([]);

export default connect(mapStateToProps)(NavigationBar);
