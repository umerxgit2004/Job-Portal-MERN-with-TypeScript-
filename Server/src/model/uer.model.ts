export interface User {
    id : string;
    name : string;
    email : string;
    password : string;
    role : 'job_seeker' | "recruiter";
    resumeUrl?:string;
}