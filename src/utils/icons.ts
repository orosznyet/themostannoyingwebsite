import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCommentDots,
  faMapMarkerAlt,
  faPaperPlane,
  faPlayCircle,
  faTags,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

export default function() {
  library.add(faCommentDots);
  library.add(faTimes);
  library.add(faTags);
  library.add(faMapMarkerAlt);
  library.add(faPaperPlane);
  library.add(faPlayCircle)
}
