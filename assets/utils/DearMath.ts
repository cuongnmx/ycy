export class DearMath {

    static GetRandomSubArray<T>(arr: Array<T>, subLength: number): Array<T> {
        let rawArr = arr.concat();
        let subArr = [];
        for (let i = 0; i < subLength; i++) {
            let n = Math.random() * rawArr.length | 0;
            subArr.push(rawArr[n]);
            rawArr.splice(n, 1);
        }
        return subArr;
    }

    static GetRandomIndexInArray(arr: Array<any>): number {
        return Math.random() * arr.length | 0;
    }

    static GetRandomIntegerInRange(min: number, max: number, includeMin: boolean = true, includeMax: boolean = true):number {
        const left = includeMin ? min : min + 1;
        const right = includeMax ? max + 1 : max;
        return left + Math.floor(Math.random() * (right - left));
    }

    static ShuffleArray<T>(arr: Array<T>) {
        let i = arr.length;
        while (i) {
            let j = Math.floor(Math.random() * i--);
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }
}