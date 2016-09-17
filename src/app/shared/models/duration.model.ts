export class Duration {
    
    public static fromSeconds(totalSeconds: number): string {
        let durationString: string = '';
        let seconds: number = totalSeconds % 60;
        let minutes: number = Math.floor((totalSeconds / 60) % 60);
        let hours: number = Math.floor(totalSeconds / 3600);
        let days: number = Math.floor(hours / 24);

        if (days > 0) {
            durationString += `${days}d `;
        }

        if (hours > 0) {
            durationString += `${hours}h `;
        }

        if (minutes > 0) {
            durationString += `${minutes}m `;
        }

        if (seconds > 0) {
            durationString += `${seconds}s`;
        }

        return durationString;
    }
}