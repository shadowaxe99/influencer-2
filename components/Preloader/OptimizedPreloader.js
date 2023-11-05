
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import useCharacterStore from "../../store/charStore";
import { useRouter } from "next/router";
const Draggable = dynamic(() => import("react-draggable"), { ssr: false });
const FontAwesomeIcon = dynamic(() => import("@fortawesome/react-fontawesome"), { ssr: false });

export default function Preloader() {
    // Component logic...
}
