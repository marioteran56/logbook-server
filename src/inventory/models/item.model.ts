import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Items{
    @PrimaryColumn()
    id: number;
    PERTENECE: string;
    FONDO: string; 
    UNIDAD_PRESUPUESTAL: string;
    CUENTA: string;
    SUBCUENTA: string;
    FOLIO: string;
    CODIGO: string;
    CANT: number
    DESCRIPCIÓN: string;
    MODELO: string;
    SERIE_DE_FÁBRICA: string;
    UBICACIÓN: string;
    RESPONSABLE: string;
    No_EMP: number
    OBSERVACIONES: string;
    status: boolean;
}