export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDetails {
  architecture: any;
  database: any;
  api: any;
  roadmap: any;
  cost: any;
}
