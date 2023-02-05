package br.edu.unoesc.backend.api_rest_controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.edu.unoesc.backend.model.Funcionario;

@RestController
@RequestMapping(value = "/api")
public class FuncionarioRestController {
	Funcionario f1 = new Funcionario(1L, "Danimar", 1, new BigDecimal("5000"), new GregorianCalendar(1990, Calendar.FEBRUARY, 05).getTime());
	Funcionario f2 = new Funcionario(2L, "Jaqueline", 0, new BigDecimal("8000"), new GregorianCalendar(1990, Calendar.JUNE, 16).getTime());
	Funcionario f3 = new Funcionario(3L, "Diego", 0, new BigDecimal("0"), new GregorianCalendar(2010, Calendar.OCTOBER, 10).getTime());
	Funcionario f4 = new Funcionario(4L, "Daniel", 2, new BigDecimal("6000"), new GregorianCalendar(1965, Calendar.NOVEMBER, 16).getTime());
	Funcionario f5 = new Funcionario(5L, "Maria", 2, new BigDecimal("4000"), new GregorianCalendar(1969, Calendar.NOVEMBER, 12).getTime());
	List<Funcionario> funcionarios;
	
	public FuncionarioRestController() {
		funcionarios = new ArrayList<Funcionario>();
		
		funcionarios.add(f1);
		funcionarios.add(f2);
		funcionarios.add(f3);
		funcionarios.add(f4);
		funcionarios.add(f5);
	}
	
	// Incluir funcionario
	@PostMapping("/funcionarios")
	public Funcionario salvarFuncionario(@RequestBody Funcionario funcionario) {
		System.out.println("Inserindo um novo funcionario...");
		System.out.println(funcionario);
		
		funcionarios.add(funcionario);
		
		System.out.println(this.listarFuncionarios());
		
		return funcionario;
	}
	
	// Alterar funcionario
	@PatchMapping("/funcionarios")
	public Funcionario atualizarFuncionario(@RequestBody Funcionario funcionario) {
		Funcionario f = findById(funcionario.getId());
		System.out.println(f);
		
		f.setNome(funcionario.getNome());
		f.setDependentes(funcionario.getDependentes());
		f.setSalario(funcionario.getSalario());
		f.setNascimento(funcionario.getNascimento());
		
		System.out.println("Atualizando o funcionario...");
		System.out.println(f);
		
		System.out.println(this.listarFuncionarios());
		
		return f;
	}
	
	// Excluir funcionario
	@DeleteMapping(value = "/funcionarios/{id}")
	public void deletarFuncionario(@PathVariable Long id) {
		Funcionario p = findById(id);
		System.out.println(p);
		
		funcionarios.remove(p);
		
		System.out.println("Excluindo funcionario [" + id + "]...");
		
		System.out.println(this.listarFuncionarios());
	}
	
	@GetMapping(value = "/funcionarios")
	public List<Funcionario> listarFuncionarios() {
		return funcionarios;
	}
	
	@GetMapping(value = "/funcionarios/{id}")
	public Funcionario findById(@PathVariable Long id) {
		for (Funcionario funcionario : funcionarios) {
			if (funcionario.getId().equals(id)) {
				return funcionario;
			}
		}
		
		return null;
	}
}
