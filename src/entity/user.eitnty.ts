import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn()
  id: number;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;
  @Column()
  address: string;
  @Column()
  certification: boolean;
  @Column()
  company: string;
  @Column()
  email: string;
  @Column()
  image_url: string;
  @Column()
  introduce: string;
  @Column()
  is_alram: boolean;
  @Column()
  keyword_alram: string;
  @Column()
  name: string;
  @Column()
  nickname: string;
  @Column()
  password: string;
  @Column()
  peer_level: number;
  @Column()
  represent_achievement: string;
  @Column()
  role: string;
}
