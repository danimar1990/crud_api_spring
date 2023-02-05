package br.edu.unoesc.backend.model;

import java.math.BigDecimal;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Funcionario {
	private Long id;
	private String nome;
	private Integer dependentes;
	private BigDecimal salario;
	private Date nascimento;
}
