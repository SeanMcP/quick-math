import { decode } from "./code.js";

// ?c=10&i=true&o=a&n=2&n3&key=116-101-115-116
export function get() {
    const usp = new URLSearchParams(location.search)
    const numbers = usp.getAll('n').map(Number)
    const operations = usp.getAll('o')
    
    return {
        allowIncorrect: usp.get('i'),
        count: usp.get('c'),
        key: decode(usp.get('key')),
        numbers,
        operations,
    }
}