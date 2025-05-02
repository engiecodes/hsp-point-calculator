export default function Header(){
    return(
        <header className="bg-gray-50 shadow mb-4 py-4 px-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">
                
            </h1>
            <nav className="space-x-4 text-sm bg-gray-50 justify-center">
                <a
                    href="https://github.com/engiecodes/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:underline"
                >
                    GitHub
                </a>
            </nav>
        </header>
    );
}
