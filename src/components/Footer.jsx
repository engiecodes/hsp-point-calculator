export default function Footer(){
    return(
        <footer className="mt-12 text-center text-sm text-gray-500 py-4 border-t">
            <p className="text-center">&copy; {new Date().getFullYear()} 
                <a href="https://github.com/engiecodes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline">{" "}Engielista Norman.</a> All rights reserved.
            </p>
        </footer>
    );
}
