import ReactMarkdown from 'react-markdown';

export default function ReadmeComponent({info}) {
    return(
        <div>
            <ReactMarkdown>{info}</ReactMarkdown>
        </div>
    )
}