interface SocialIconProps {
	name: string;
	url: string;
}

export default function SocialIcon({ name, url }: SocialIconProps) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="social-link"
			aria-label={`${name === "github" ? "GitHub" : "LinkedIn"} (opens in a new tab)`}
		>
			{name === "linkedin" ? (
				<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
				</svg>
			) : (
				<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.82a9.56 9.56 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
				</svg>
			)}
		</a>
	);
}
