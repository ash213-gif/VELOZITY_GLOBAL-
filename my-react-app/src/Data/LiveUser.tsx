export interface PresenceUser{
    id:string,
    name:string,
    currenttask:string | null;
}

export const liveUsers: PresenceUser[] = [
  { id: "u1", name: "Aman",  currenttask: null },
  { id: "u2", name: "Priya",  currenttask: null },
  { id: "u3", name: "Rahul",  currenttask: null },
  { id: "u4", name: "Neha", currenttask: null },
];