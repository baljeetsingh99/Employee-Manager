package tech.getarrays.employeemanager.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tech.getarrays.employeemanager.exception.UserNotFoundException;
import tech.getarrays.employeemanager.model.Employee;
import tech.getarrays.employeemanager.repo.EmployeeRepo;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	
	public Employee addEmployee(Employee employee)
	{
		//to set random employee code
		employee.setEmployeeCode(UUID.randomUUID().toString());
		return employeeRepo.save(employee);
		
	}
	
	public List<Employee> findAllEmployees()
	{
		return employeeRepo.findAll();
	}
	
	public Employee updateEmployee(Employee employee)
	{
		return employeeRepo.save(employee);
	}
	
	public Employee findEmployeeById(Long id)
	{
		try 
		{
			return employeeRepo.findById(id).get();	
		} 
		catch (Exception e) {
			e = new UserNotFoundException("User by id "+id+"was not found");
			
		}
		return null;
		
	}
	
	public void deleteEmployee(Long id)
	{
		employeeRepo.deleteById(id);
	}

}
