const Footer = () => {
    return (
        <footer className={"bg-slate-600 flex flex-row p-2"}>
            <div>
                <img src={"ico_negate.png"} alt="logo" width={40} height={40}/>
            </div>
            <div className={"font-bold text-white pl-2 pt-2 pb-2"}>
                TimeCutter
            </div>
            <div className={"flex-grow text-center pb-2 pt-2"}>
            </div>
            <div className={"mr-5 cursor-pointer"}>
                <a href='https://github.com/Itanoji/time-cutter' target="_blank" rel="noopener noreferrer">
                    <img src={"github-mark-white.svg"} alt="github" width={40} height={40}/>
                </a>
            </div>
        </footer>
    );
}

export default Footer;