/**
 * Project: Typing_Lizard_Frontend
 * Author : Alexander Friedl
 * Date : 11.06.2024
 * Time : 13:38
 */


export interface Mode {
    modeid: number;
    nameName: string;
    modeTime: number;
    wordList: Word[]
}

export interface Word {
    wordId: number;
    wordName: string;
    rating: number;
}
