import { Link } from "react-router-dom";
import { Link2, ArrowRight } from "lucide-react";

// Home / Gallery / About ke left pane ke end me: bottom ab yahan edit nahi hota, alag page par hota hai.
export default function SharedBottomNote() {
  return (
    <div className="sx-note">
      <span className="sx-note-ic"><Link2 size={18} /></span>
      <div>
        <b>Bottom section is shared</b>
        <p>The call-to-action and footer at the end of the preview appear on every page. Edit them once, in one place.</p>
      </div>
      <Link to="/website/bottom" className="sx-note-link">Edit bottom section <ArrowRight size={15} /></Link>
    </div>
  );
}
