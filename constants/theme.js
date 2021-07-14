import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#FC6D3F", // orange
    secondary: "#CDCDD2",   // gray


    // colors
    black: "#1E1F20",
    white: "#FFFFFF",

    lightGray: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: '#898C95',
    gray: "#BEC1D2",
    blue: '#42B0FF',
    yellow: '#FFD573',
    lightBlue: '#95A9B8',
    darkgreen: '#008159',
    peach: '#FF615F',
    purple: '#8e44ad',
    red: '#FF0000',
    green:"#1fa67a",
    pink:"FD33FF",
};

export const SIZES = {
    // global sizes
    base: 8,
    input: 1,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,
    header: 45,

    // font sizes
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: {  fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: {  fontSize: SIZES.h1, lineHeight: 36 },
    h2: {  fontSize: SIZES.h2, lineHeight: 30 },
    h3: {  fontSize: SIZES.h3, lineHeight: 22 },
    h4: {  fontSize: SIZES.h4, lineHeight: 22 },
    body1: {  fontSize: SIZES.body1, lineHeight: 36 },
    body2: {  fontSize: SIZES.body2, lineHeight: 30 },
    body3: {  fontSize: SIZES.body3, lineHeight: 22 },
    body4: {  fontSize: SIZES.body4, lineHeight: 22 },
    body5: {  fontSize: SIZES.body5, lineHeight: 22 },
};
export const iconData = [
    {
        "name": "tint",
        "id": "Tint"
      },
      {
        "name": "bolt",
        "id": "Bolt"
      },
      {
        "name": "fire",
        "id": "Fire"
      },
      {
        "name": "lightbulb-o",
        "id": "Lightbulb o"
      },
    {
      "name": "plug",
      "id": "Plug"
    },
      {
        "name": "car",
        "id": "Car"
      },
      {
        "name": "trash",
        "id": "Trash"
      },
    {
      "name": "child",
      "id": "Child"
    },
    {
      "name": "ambulance",
      "id": "Ambulance"
    },
    
    {
      "name": "cutlery",
      "id": "Cutlery"
    },
    {
        "name": "shopping-cart",
        "id": "Shopping cart"
      },
    {
      "name": "camera",
      "id": "Camera"
    },
    
    {
      "name": "film",
      "id": "Film"
    },
    
    {
      "name": "bus",
      "id": "Bus"
    },
    {
      "name": "futbol-o",
      "id": "Futbol o"
    },
    {
      "name": "gamepad",
      "id": "Gamepad"
    },
    {
      "name": "gavel",
      "id": "Gavel"
    },
    {
      "name": "gbp",
      "id": "Gbp"
    },
    {
      "name": "calculator",
      "id": "Calculator"
    },
    {
      "name": "calendar",
      "id": "Calendar"
    },
    {
        "name": "headphones",
        "id": "Headphones"
      },
      {
        "name": "heart",
        "id": "Heart"
      },
    {
      "name": "plane",
      "id": "Plane"
    },
    {
      "name": "bed",
      "id": "Bed"
    },
    {
      "name": "beer",
      "id": "Beer"
    },
    {
      "name": "bicycle",
      "id": "Bicycle"
    },
    {
      "name": "birthday-cake",
      "id": "Birthday cake"
    },
    {
        "name": "glass",
        "id": "Glass"
      },
    {
      "name": "book",
      "id": "Book"
    },
    {
      "name": "btc",
      "id": "Btc"
    },
    {
        "name": "anchor",
        "id": "Anchor"
      },
    {
      "name": "building",
      "id": "Building"
    },
    {
      "name": "building-o",
      "id": "Building o"
    },
    
    {
      "name": "recycle",
      "id": "Recycle"
    },
    {
      "name": "rocket",
      "id": "Rocket"
    },
    {
      "name": "scissors",
      "id": "Scissors"
    },
    {
      "name": "search",
      "id": "Search"
    },
    {
      "name": "shield",
      "id": "Shield"
    },
    {
      "name": "ship",
      "id": "Ship"
    },
    
    {
      "name": "spoon",
      "id": "Spoon"
    },
    {
      "name": "tag",
      "id": "Tag"
    },
    {
      "name": "taxi",
      "id": "Taxi"
    },

    {
      "name": "trophy",
      "id": "Trophy"
    },
    {
      "name": "truck",
      "id": "Truck"
    },
    {
      "name": "umbrella",
      "id": "Umbrella"
    },
    {
      "name": "university",
      "id": "University"
    },
    {
      "name": "usd",
      "id": "Usd"
    },
    {
      "name": "user",
      "id": "User"
    },
    {
      "name": "user-md",
      "id": "User md"
    },
    {
      "name": "user-plus",
      "id": "User plus"
    },
    {
      "name": "user-secret",
      "id": "User secret"
    },
    {
      "name": "volume-up",
      "id": "Volume up"
    },
    {
      "name": "wrench",
      "id": "Wrench"
    },
    {
      "name": "archive",
      "id": "Archive"
    },
    {
      "name": "area-chart",
      "id": "Area chart"
    },
    {
      "name": "balance-scale",
      "id": "Balance scale"
    },
    {
      "name": "phone",
      "id": "Phone"
    },
    {
      "name": "phone-square",
      "id": "Phone square"
    },
    {
      "name": "puzzle-piece",
      "id": "Puzzle piece"
    },
    {
      "name": "television",
      "id": "Television"
    }, ,
    {
      "name": "bar-chart",
      "id": "Bar chart"
    },
    {
      "name": "barcode",
      "id": "Barcode"
    },

    {
      "name": "battery-empty",
      "id": "Battery empty"
    },
    {
      "name": "battery-full",
      "id": "Battery full"
    },
    {
      "name": "bell",
      "id": "Bell"
    },
    {
      "name": "bell-o",
      "id": "Bell o"
    },
    {
      "name": "binoculars",
      "id": "Binoculars"
    },
    {
      "name": "black-tie",
      "id": "Black tie"
    },
    {
      "name": "bomb",
      "id": "Bomb"
    },
    {
      "name": "bookmark",
      "id": "Bookmark"
    },
    {
      "name": "bookmark-o",
      "id": "Bookmark o"
    },
    {
      "name": "briefcase",
      "id": "Briefcase"
    },

    {
      "name": "bug",
      "id": "Bug"
    },
    {
      "name": "bullhorn",
      "id": "Bullhorn"
    },
    {
      "name": "amazon",
      "id": "Amazon"
    },
    {
      "name": "cart-arrow-down",
      "id": "Cart arrow down"
    },
    {
      "name": "cart-plus",
      "id": "Cart plus"
    },
    {
      "name": "cc-amex",
      "id": "Cc amex"
    },
    {
      "name": "cc-diners-club",
      "id": "Cc diners club"
    },
    {
      "name": "android",
      "id": "Android"
    },
    {
      "name": "cc-discover",
      "id": "Cc discover"
    },
    {
      "name": "cc-jcb",
      "id": "Cc jcb"
    },
    {
      "name": "cc-mastercard",
      "id": "Cc mastercard"
    },
    {
      "name": "cc-paypal",
      "id": "Cc paypal"
    },
    {
      "name": "cc-stripe",
      "id": "Cc stripe"
    },
    {
      "name": "cc-visa",
      "id": "Cc visa"
    },
    {
      "name": "certificate",
      "id": "Certificate"
    },
    {
      "name": "chain-broken",
      "id": "Chain broken"
    },
    {
      "name": "check",
      "id": "Check"
    },
    {
      "name": "check-circle",
      "id": "Check circle"
    },
    {
      "name": "clipboard",
      "id": "Clipboard"
    },
    {
      "name": "clock-o",
      "id": "Clock o"
    },
    {
      "name": "cloud",
      "id": "Cloud"
    },
    {
      "name": "cloud-download",
      "id": "Cloud download"
    },
    {
      "name": "cloud-upload",
      "id": "Cloud upload"
    },
    {
      "name": "code",
      "id": "Code"
    },
    {
      "name": "code-fork",
      "id": "Code fork"
    },
    {
      "name": "codepen",
      "id": "Codepen"
    },
    {
      "name": "coffee",
      "id": "Coffee"
    },
    {
      "name": "cog",
      "id": "Cog"
    },
    {
      "name": "cogs",
      "id": "Cogs"
    },
    {
      "name": "columns",
      "id": "Columns"
    },
    {
      "name": "comment",
      "id": "Comment"
    },
    {
      "name": "comment-o",
      "id": "Comment o"
    },
    {
      "name": "commenting",
      "id": "Commenting"
    },
    {
      "name": "commenting-o",
      "id": "Commenting o"
    },
    {
      "name": "comments",
      "id": "Comments"
    },
    {
      "name": "comments-o",
      "id": "Comments o"
    },
    {
      "name": "compass",
      "id": "Compass"
    },

    {
      "name": "credit-card",
      "id": "Credit card"
    },
    {
      "name": "cube",
      "id": "Cube"
    },
    {
      "name": "cubes",
      "id": "Cubes"
    },
    {
      "name": "database",
      "id": "Database"
    },
    {
      "name": "desktop",
      "id": "Desktop"
    },
    {
      "name": "diamond",
      "id": "Diamond"
    },
    {
      "name": "download",
      "id": "Download"
    },
    {
      "name": "empire",
      "id": "Empire"
    },
    {
      "name": "envelope",
      "id": "Envelope"
    },
    {
      "name": "envelope-o",
      "id": "Envelope o"
    },
    {
      "name": "eraser",
      "id": "Eraser"
    },
    {
      "name": "eur",
      "id": "Eur"
    },
    {
      "name": "exchange",
      "id": "Exchange"
    },
    {
      "name": "external-link",
      "id": "External link"
    },
    {
      "name": "external-link-square",
      "id": "External link square"
    },
    {
      "name": "eye",
      "id": "Eye"
    },
    {
      "name": "eye-slash",
      "id": "Eye slash"
    },
    {
      "name": "eyedropper",
      "id": "Eyedropper"
    },
    {
      "name": "facebook",
      "id": "Facebook"
    },
    {
      "name": "facebook-official",
      "id": "Facebook official"
    },
    {
      "name": "facebook-square",
      "id": "Facebook square"
    },
    {
      "name": "fast-backward",
      "id": "Fast backward"
    },
    {
      "name": "fast-forward",
      "id": "Fast forward"
    },
    {
      "name": "fax",
      "id": "Fax"
    },
    {
      "name": "female",
      "id": "Female"
    },
    {
      "name": "fighter-jet",
      "id": "Fighter jet"
    },
    {
      "name": "file",
      "id": "File"
    },
    {
      "name": "file-archive-o",
      "id": "File archive o"
    },
    {
      "name": "file-audio-o",
      "id": "File audio o"
    },
    {
      "name": "file-code-o",
      "id": "File code o"
    },
    {
      "name": "file-excel-o",
      "id": "File excel o"
    },
    {
      "name": "file-image-o",
      "id": "File image o"
    },
    {
      "name": "file-o",
      "id": "File o"
    },
    {
      "name": "file-pdf-o",
      "id": "File pdf o"
    },
    {
      "name": "file-powerpoint-o",
      "id": "File powerpoint o"
    },
    {
      "name": "file-text",
      "id": "File text"
    },
    {
      "name": "file-text-o",
      "id": "File text o"
    },
    {
      "name": "file-video-o",
      "id": "File video o"
    },
    {
      "name": "file-word-o",
      "id": "File word o"
    },
    {
      "name": "files-o",
      "id": "Files o"
    },

    {
      "name": "filter",
      "id": "Filter"
    },
    {
      "name": "fire-extinguisher",
      "id": "Fire extinguisher"
    },
    {
      "name": "firefox",
      "id": "Firefox"
    },
    {
      "name": "flag",
      "id": "Flag"
    },
    {
      "name": "flag-checkered",
      "id": "Flag checkered"
    },
    {
      "name": "flag-o",
      "id": "Flag o"
    },
    {
      "name": "flask",
      "id": "Flask"
    },
    {
      "name": "flickr",
      "id": "Flickr"
    },
    {
      "name": "floppy-o",
      "id": "Floppy o"
    },
    {
      "name": "folder",
      "id": "Folder"
    },
    {
      "name": "folder-o",
      "id": "Folder o"
    },
    {
      "name": "folder-open",
      "id": "Folder open"
    },
    {
      "name": "folder-open-o",
      "id": "Folder open o"
    },
    {
      "name": "font",
      "id": "Font"
    },
    {
      "name": "fonticons",
      "id": "Fonticons"
    },
    {
      "name": "forumbee",
      "id": "Forumbee"
    },
    {
      "name": "forward",
      "id": "Forward"
    },
    {
      "name": "foursquare",
      "id": "Foursquare"
    },
    {
      "name": "frown-o",
      "id": "Frown o"
    },

    {
      "name": "genderless",
      "id": "Genderless"
    },
    {
      "name": "get-pocket",
      "id": "Get pocket"
    },
    {
      "name": "gg",
      "id": "Gg"
    },
    {
      "name": "gg-circle",
      "id": "Gg circle"
    },
    {
      "name": "gift",
      "id": "Gift"
    },
    {
      "name": "git",
      "id": "Git"
    },
    {
      "name": "git-square",
      "id": "Git square"
    },
    {
      "name": "github",
      "id": "Github"
    },
    {
      "name": "github-alt",
      "id": "Github alt"
    },
    {
      "name": "github-square",
      "id": "Github square"
    },
    
    {
      "name": "globe",
      "id": "Globe"
    },
    {
      "name": "google",
      "id": "Google"
    },
    {
      "name": "google-plus",
      "id": "Google plus"
    },
    {
      "name": "google-plus-square",
      "id": "Google plus square"
    },
    {
      "name": "google-wallet",
      "id": "Google wallet"
    },
    {
      "name": "graduation-cap",
      "id": "Graduation cap"
    },
    {
      "name": "gratipay",
      "id": "Gratipay"
    },
    {
      "name": "h-square",
      "id": "H square"
    },
    {
      "name": "hacker-news",
      "id": "Hacker news"
    },
    {
      "name": "hand-lizard-o",
      "id": "Hand lizard o"
    },
    {
      "name": "hand-o-down",
      "id": "Hand o down"
    },
    {
      "name": "hand-o-left",
      "id": "Hand o left"
    },
    {
      "name": "hand-o-right",
      "id": "Hand o right"
    },
    {
      "name": "hand-o-up",
      "id": "Hand o up"
    },
    {
      "name": "hand-paper-o",
      "id": "Hand paper o"
    },
    {
      "name": "hand-peace-o",
      "id": "Hand peace o"
    },
    {
      "name": "hand-pointer-o",
      "id": "Hand pointer o"
    },
    {
      "name": "hand-rock-o",
      "id": "Hand rock o"
    },
    {
      "name": "hand-scissors-o",
      "id": "Hand scissors o"
    },
    {
      "name": "hand-spock-o",
      "id": "Hand spock o"
    },
    {
      "name": "hdd-o",
      "id": "Hdd o"
    },
    {
      "name": "header",
      "id": "Header"
    },
    {
      "name": "heart-o",
      "id": "Heart o"
    },
    {
      "name": "heartbeat",
      "id": "Heartbeat"
    },
    {
      "name": "history",
      "id": "History"
    },
    {
      "name": "home",
      "id": "Home"
    },
    {
      "name": "hospital-o",
      "id": "Hospital o"
    },
    {
      "name": "hourglass",
      "id": "Hourglass"
    },
    {
      "name": "hourglass-end",
      "id": "Hourglass end"
    },
    {
      "name": "hourglass-half",
      "id": "Hourglass half"
    },
    {
      "name": "hourglass-o",
      "id": "Hourglass o"
    },
    {
      "name": "hourglass-start",
      "id": "Hourglass start"
    },
    {
      "name": "houzz",
      "id": "Houzz"
    },
    {
      "name": "html5",
      "id": "Html5"
    },
    {
      "name": "i-cursor",
      "id": "I cursor"
    },
    {
      "name": "ils",
      "id": "Ils"
    },
    {
      "name": "inbox",
      "id": "Inbox"
    },
    {
      "name": "indent",
      "id": "Indent"
    },
    {
      "name": "industry",
      "id": "Industry"
    },
    {
      "name": "info",
      "id": "Info"
    },
    {
      "name": "info-circle",
      "id": "Info circle"
    },
    {
      "name": "inr",
      "id": "Inr"
    },
    {
      "name": "instagram",
      "id": "Instagram"
    },
    {
      "name": "internet-explorer",
      "id": "Internet explorer"
    },
    {
      "name": "ioxhost",
      "id": "Ioxhost"
    },
    {
      "name": "italic",
      "id": "Italic"
    },
    {
      "name": "joomla",
      "id": "Joomla"
    },
    {
      "name": "jpy",
      "id": "Jpy"
    },
    {
      "name": "jsfiddle",
      "id": "Jsfiddle"
    },
    {
      "name": "key",
      "id": "Key"
    },
    {
      "name": "keyboard-o",
      "id": "Keyboard o"
    },
    {
      "name": "krw",
      "id": "Krw"
    },
    {
      "name": "language",
      "id": "Language"
    },
    {
      "name": "laptop",
      "id": "Laptop"
    },
    {
      "name": "lastfm",
      "id": "Lastfm"
    },
    {
      "name": "lastfm-square",
      "id": "Lastfm square"
    },
    {
      "name": "leaf",
      "id": "Leaf"
    },
    {
      "name": "leanpub",
      "id": "Leanpub"
    },
    {
      "name": "lemon-o",
      "id": "Lemon o"
    },
    {
      "name": "level-down",
      "id": "Level down"
    },
    {
      "name": "level-up",
      "id": "Level up"
    },
    {
      "name": "life-ring",
      "id": "Life ring"
    },
    {
      "name": "line-chart",
      "id": "Line chart"
    },
    {
      "name": "link",
      "id": "Link"
    },
    {
      "name": "linkedin",
      "id": "Linkedin"
    },
    {
      "name": "linkedin-square",
      "id": "Linkedin square"
    },
    {
      "name": "linux",
      "id": "Linux"
    },
    {
      "name": "list",
      "id": "List"
    },
    {
      "name": "list-alt",
      "id": "List alt"
    },
    {
      "name": "list-ol",
      "id": "List ol"
    },
    {
      "name": "list-ul",
      "id": "List ul"
    },
    {
      "name": "location-arrow",
      "id": "Location arrow"
    },
    {
      "name": "lock",
      "id": "Lock"
    },
    {
      "name": "long-arrow-down",
      "id": "Long arrow down"
    },
    {
      "name": "long-arrow-left",
      "id": "Long arrow left"
    },
    {
      "name": "long-arrow-right",
      "id": "Long arrow right"
    },
    {
      "name": "long-arrow-up",
      "id": "Long arrow up"
    },
    {
      "name": "magic",
      "id": "Magic"
    },
    {
      "name": "magnet",
      "id": "Magnet"
    },
    {
      "name": "male",
      "id": "Male"
    },
    {
      "name": "map",
      "id": "Map"
    },
    {
      "name": "map-marker",
      "id": "Map marker"
    },
    {
      "name": "map-o",
      "id": "Map o"
    },
    {
      "name": "map-pin",
      "id": "Map pin"
    },
    {
      "name": "map-signs",
      "id": "Map signs"
    },
    {
      "name": "mars",
      "id": "Mars"
    },
    {
      "name": "mars-double",
      "id": "Mars double"
    },
    {
      "name": "mars-stroke",
      "id": "Mars stroke"
    },
    {
      "name": "mars-stroke-h",
      "id": "Mars stroke h"
    },
    {
      "name": "mars-stroke-v",
      "id": "Mars stroke v"
    },
    {
      "name": "maxcdn",
      "id": "Maxcdn"
    },
    {
      "name": "meanpath",
      "id": "Meanpath"
    },
    {
      "name": "medium",
      "id": "Medium"
    },
    {
      "name": "medkit",
      "id": "Medkit"
    },
    {
      "name": "meh-o",
      "id": "Meh o"
    },
    {
      "name": "mercury",
      "id": "Mercury"
    },
    {
      "name": "microphone",
      "id": "Microphone"
    },
    {
      "name": "microphone-slash",
      "id": "Microphone slash"
    },
    {
      "name": "minus",
      "id": "Minus"
    },
    {
      "name": "minus-circle",
      "id": "Minus circle"
    },
    {
      "name": "minus-square",
      "id": "Minus square"
    },
    {
      "name": "minus-square-o",
      "id": "Minus square o"
    },
    {
      "name": "mobile",
      "id": "Mobile"
    },
    {
      "name": "money",
      "id": "Money"
    },
    {
      "name": "moon-o",
      "id": "Moon o"
    },
    {
      "name": "motorcycle",
      "id": "Motorcycle"
    },
    {
      "name": "mouse-pointer",
      "id": "Mouse pointer"
    },
    {
      "name": "music",
      "id": "Music"
    },
    {
      "name": "neuter",
      "id": "Neuter"
    },
    {
      "name": "newspaper-o",
      "id": "Newspaper o"
    },
    {
      "name": "object-group",
      "id": "Object group"
    },
    {
      "name": "object-ungroup",
      "id": "Object ungroup"
    },
    {
      "name": "odnoklassniki",
      "id": "Odnoklassniki"
    },
    {
      "name": "odnoklassniki-square",
      "id": "Odnoklassniki square"
    },
    {
      "name": "opencart",
      "id": "Opencart"
    },
    {
      "name": "openid",
      "id": "Openid"
    },
    {
      "name": "opera",
      "id": "Opera"
    },
    {
      "name": "optin-monster",
      "id": "Optin monster"
    },
    {
      "name": "outdent",
      "id": "Outdent"
    },
    {
      "name": "pagelines",
      "id": "Pagelines"
    },
    {
      "name": "paint-brush",
      "id": "Paint brush"
    },
    {
      "name": "paper-plane",
      "id": "Paper plane"
    },
    {
      "name": "paper-plane-o",
      "id": "Paper plane o"
    },
    {
      "name": "paperclip",
      "id": "Paperclip"
    },
    {
      "name": "paragraph",
      "id": "Paragraph"
    },
    {
      "name": "pause",
      "id": "Pause"
    },
    {
      "name": "paw",
      "id": "Paw"
    },
    {
      "name": "paypal",
      "id": "Paypal"
    },
    {
      "name": "pencil",
      "id": "Pencil"
    },
    {
      "name": "pencil-square",
      "id": "Pencil square"
    },
    {
      "name": "pencil-square-o",
      "id": "Pencil square o"
    },

    {
      "name": "picture-o",
      "id": "Picture o"
    },
    {
      "name": "pie-chart",
      "id": "Pie chart"
    },
    {
      "name": "pied-piper",
      "id": "Pied piper"
    },
    {
      "name": "pied-piper-alt",
      "id": "Pied piper alt"
    },
    {
      "name": "pinterest",
      "id": "Pinterest"
    },
    {
      "name": "pinterest-p",
      "id": "Pinterest p"
    },
    {
      "name": "pinterest-square",
      "id": "Pinterest square"
    },

    {
      "name": "play",
      "id": "Play"
    },
    {
      "name": "play-circle",
      "id": "Play circle"
    },
    {
      "name": "play-circle-o",
      "id": "Play circle o"
    },

    {
      "name": "plus",
      "id": "Plus"
    },
    {
      "name": "plus-circle",
      "id": "Plus circle"
    },
    {
      "name": "plus-square",
      "id": "Plus square"
    },
    {
      "name": "plus-square-o",
      "id": "Plus square o"
    },
    {
      "name": "power-off",
      "id": "Power off"
    },
    {
      "name": "print",
      "id": "Print"
    },

    {
      "name": "qq",
      "id": "Qq"
    },
    {
      "name": "qrcode",
      "id": "Qrcode"
    },
    {
      "name": "question",
      "id": "Question"
    },
    {
      "name": "question-circle",
      "id": "Question circle"
    },
    {
      "name": "quote-left",
      "id": "Quote left"
    },
    {
      "name": "quote-right",
      "id": "Quote right"
    },
    {
      "name": "random",
      "id": "Random"
    },
    {
      "name": "rebel",
      "id": "Rebel"
    },

    {
      "name": "reddit",
      "id": "Reddit"
    },
    {
      "name": "reddit-square",
      "id": "Reddit square"
    },
    {
      "name": "refresh",
      "id": "Refresh"
    },
    {
      "name": "registered",
      "id": "Registered"
    },
    {
      "name": "renren",
      "id": "Renren"
    },
    {
      "name": "repeat",
      "id": "Repeat"
    },
    {
      "name": "reply",
      "id": "Reply"
    },
    {
      "name": "reply-all",
      "id": "Reply all"
    },
    {
      "name": "retweet",
      "id": "Retweet"
    },
    {
      "name": "road",
      "id": "Road"
    },

    {
      "name": "rss",
      "id": "Rss"
    },
    {
      "name": "rss-square",
      "id": "Rss square"
    },
    {
      "name": "rub",
      "id": "Rub"
    },
    {
      "name": "safari",
      "id": "Safari"
    },


    {
      "name": "search-minus",
      "id": "Search minus"
    },
    {
      "name": "search-plus",
      "id": "Search plus"
    },
    {
      "name": "sellsy",
      "id": "Sellsy"
    },
    {
      "name": "server",
      "id": "Server"
    },
    {
      "name": "share",
      "id": "Share"
    },
    {
      "name": "share-alt",
      "id": "Share alt"
    },
    {
      "name": "share-alt-square",
      "id": "Share alt square"
    },
    {
      "name": "share-square",
      "id": "Share square"
    },
    {
      "name": "share-square-o",
      "id": "Share square o"
    },

    {
      "name": "shirtsinbulk",
      "id": "Shirtsinbulk"
    },

    {
      "name": "sign-in",
      "id": "Sign in"
    },
    {
      "name": "sign-out",
      "id": "Sign out"
    },
    {
      "name": "signal",
      "id": "Signal"
    },
    {
      "name": "simplybuilt",
      "id": "Simplybuilt"
    },
    {
      "name": "sitemap",
      "id": "Sitemap"
    },
    {
      "name": "skyatlas",
      "id": "Skyatlas"
    },
    {
      "name": "skype",
      "id": "Skype"
    },
    {
      "name": "slack",
      "id": "Slack"
    },
    {
      "name": "sliders",
      "id": "Sliders"
    },
    {
      "name": "slideshare",
      "id": "Slideshare"
    },
    {
      "name": "smile-o",
      "id": "Smile o"
    },
    {
      "name": "sort",
      "id": "Sort"
    },
    {
      "name": "sort-alpha-asc",
      "id": "Sort alpha asc"
    },
    {
      "name": "sort-alpha-desc",
      "id": "Sort alpha desc"
    },
    {
      "name": "sort-amount-asc",
      "id": "Sort amount asc"
    },
    {
      "name": "sort-amount-desc",
      "id": "Sort amount desc"
    },
    {
      "name": "sort-asc",
      "id": "Sort asc"
    },
    {
      "name": "sort-desc",
      "id": "Sort desc"
    },
    {
      "name": "sort-numeric-asc",
      "id": "Sort numeric asc"
    },
    {
      "name": "sort-numeric-desc",
      "id": "Sort numeric desc"
    },
    {
      "name": "soundcloud",
      "id": "Soundcloud"
    },
    {
      "name": "space-shuttle",
      "id": "Space shuttle"
    },
    {
      "name": "spinner",
      "id": "Spinner"
    },

    {
      "name": "spotify",
      "id": "Spotify"
    },
    {
      "name": "square",
      "id": "Square"
    },
    {
      "name": "square-o",
      "id": "Square o"
    },
    {
      "name": "stack-exchange",
      "id": "Stack exchange"
    },
    {
      "name": "stack-overflow",
      "id": "Stack overflow"
    },
    {
      "name": "star",
      "id": "Star"
    },
    {
      "name": "star-half",
      "id": "Star half"
    },
    {
      "name": "star-half-o",
      "id": "Star half o"
    },
    {
      "name": "star-o",
      "id": "Star o"
    },
    {
      "name": "steam",
      "id": "Steam"
    },
    {
      "name": "steam-square",
      "id": "Steam square"
    },
    {
      "name": "step-backward",
      "id": "Step backward"
    },
    {
      "name": "step-forward",
      "id": "Step forward"
    },
    {
      "name": "stethoscope",
      "id": "Stethoscope"
    },
    {
      "name": "sticky-note",
      "id": "Sticky note"
    },
    {
      "name": "sticky-note-o",
      "id": "Sticky note o"
    },
    {
      "name": "stop",
      "id": "Stop"
    },
    {
      "name": "street-view",
      "id": "Street view"
    },
    {
      "name": "strikethrough",
      "id": "Strikethrough"
    },
    {
      "name": "stumbleupon",
      "id": "Stumbleupon"
    },
    {
      "name": "stumbleupon-circle",
      "id": "Stumbleupon circle"
    },
    {
      "name": "subscript",
      "id": "Subscript"
    },
    {
      "name": "subway",
      "id": "Subway"
    },
    {
      "name": "suitcase",
      "id": "Suitcase"
    },
    {
      "name": "sun-o",
      "id": "Sun o"
    },
    {
      "name": "superscript",
      "id": "Superscript"
    },
    {
      "name": "table",
      "id": "Table"
    },
    {
      "name": "tablet",
      "id": "Tablet"
    },
    {
      "name": "tachometer",
      "id": "Tachometer"
    },

    {
      "name": "tags",
      "id": "Tags"
    },
    {
      "name": "tasks",
      "id": "Tasks"
    },


    {
      "name": "tencent-weibo",
      "id": "Tencent weibo"
    },
    {
      "name": "terminal",
      "id": "Terminal"
    },
    {
      "name": "text-height",
      "id": "Text height"
    },
    {
      "name": "text-width",
      "id": "Text width"
    },
    {
      "name": "th",
      "id": "Th"
    },
    {
      "name": "th-large",
      "id": "Th large"
    },
    {
      "name": "th-list",
      "id": "Th list"
    },
    {
      "name": "thumb-tack",
      "id": "Thumb tack"
    },
    {
      "name": "thumbs-down",
      "id": "Thumbs down"
    },
    {
      "name": "thumbs-o-down",
      "id": "Thumbs o down"
    },
    {
      "name": "thumbs-o-up",
      "id": "Thumbs o up"
    },
    {
      "name": "thumbs-up",
      "id": "Thumbs up"
    },
    {
      "name": "ticket",
      "id": "Ticket"
    },
    {
      "name": "times",
      "id": "Times"
    },
    {
      "name": "times-circle",
      "id": "Times circle"
    },
    {
      "name": "times-circle-o",
      "id": "Times circle o"
    },

    {
      "name": "toggle-off",
      "id": "Toggle off"
    },
    {
      "name": "toggle-on",
      "id": "Toggle on"
    },
    {
      "name": "trademark",
      "id": "Trademark"
    },
    {
      "name": "train",
      "id": "Train"
    },
    {
      "name": "transgender",
      "id": "Transgender"
    },
    {
      "name": "transgender-alt",
      "id": "Transgender alt"
    },

    {
      "name": "trash-o",
      "id": "Trash o"
    },
    {
      "name": "tree",
      "id": "Tree"
    },
    {
      "name": "trello",
      "id": "Trello"
    },
    {
      "name": "tripadvisor",
      "id": "Tripadvisor"
    },

    {
      "name": "try",
      "id": "Try"
    },
    {
      "name": "tty",
      "id": "Tty"
    },
    {
      "name": "tumblr",
      "id": "Tumblr"
    },
    {
      "name": "tumblr-square",
      "id": "Tumblr square"
    },
    {
      "name": "twitch",
      "id": "Twitch"
    },
    {
      "name": "twitter",
      "id": "Twitter"
    },
    {
      "name": "twitter-square",
      "id": "Twitter square"
    },

    {
      "name": "underline",
      "id": "Underline"
    },
    {
      "name": "undo",
      "id": "Undo"
    },

    {
      "name": "unlock",
      "id": "Unlock"
    },
    {
      "name": "unlock-alt",
      "id": "Unlock alt"
    },
    {
      "name": "upload",
      "id": "Upload"
    },
    {
      "name": "user-times",
      "id": "User times"
    },
    {
      "name": "users",
      "id": "Users"
    },
    {
      "name": "venus",
      "id": "Venus"
    },
    {
      "name": "venus-double",
      "id": "Venus double"
    },
    {
      "name": "venus-mars",
      "id": "Venus mars"
    },
    {
      "name": "viacoin",
      "id": "Viacoin"
    },
    {
      "name": "video-camera",
      "id": "Video camera"
    },
    {
      "name": "vimeo",
      "id": "Vimeo"
    },
    {
      "name": "vimeo-square",
      "id": "Vimeo square"
    },
    {
      "name": "vine",
      "id": "Vine"
    },
    {
      "name": "vk",
      "id": "Vk"
    },
    {
      "name": "volume-down",
      "id": "Volume down"
    },
    {
      "name": "volume-off",
      "id": "Volume off"
    },

    {
      "name": "weibo",
      "id": "Weibo"
    },
    {
      "name": "weixin",
      "id": "Weixin"
    },
    {
      "name": "whatsapp",
      "id": "Whatsapp"
    },
    {
      "name": "wheelchair",
      "id": "Wheelchair"
    },
    {
      "name": "wifi",
      "id": "Wifi"
    },
    {
      "name": "wikipedia-w",
      "id": "Wikipedia w"
    },
    {
      "name": "windows",
      "id": "Windows"
    },
    {
      "name": "wordpress",
      "id": "Wordpress"
    },

    {
      "name": "xing",
      "id": "Xing"
    },
    {
      "name": "xing-square",
      "id": "Xing square"
    },
    {
      "name": "y-combinator",
      "id": "Y combinator"
    },
    {
      "name": "yahoo",
      "id": "Yahoo"
    },
    {
      "name": "yelp",
      "id": "Yelp"
    },
    {
      "name": "youtube",
      "id": "Youtube"
    },
    {
      "name": "youtube-play",
      "id": "Youtube play"
    },
    {
      "name": "youtube-square",
      "id": "Youtube square"
    }
  ];

const appTheme = { COLORS, SIZES, FONTS, iconData };

export default appTheme;