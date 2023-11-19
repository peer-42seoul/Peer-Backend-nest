import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'temp' })
export class Temp {
  @PrimaryColumn()
  id: number;
  @Column()
  message: string;
}
