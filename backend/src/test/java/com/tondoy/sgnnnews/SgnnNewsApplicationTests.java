package com.tondoy.sgnnnews;

import com.tondoy.sgnnnews.model.Article;
import com.tondoy.sgnnnews.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SgnnNewsApplicationTests {

	User user;
	Article article;

	@Test
	void contextLoads() {
	}


	/***  Users  ***/

	@Test
	public void userHasName() {
		String name = "Bill Daly";
		User user = new User();
		user.setName(name);
		assertNotNull(user);
		assertEquals(name, user.getName());
	}

	@Test
	public void userHasDepartment() {
		String department = "sports";
		User user = new User();
		user.setDepartment(department);
		assertNotNull(user);
		assertEquals(department, user.getDepartment());
	}

	@Test
	public void userHasArticles() {
		List<String> articles = Arrays.asList(
				"6476069545cd7d4a4ac12724",
				"6476069545cd7d4a4ac12726",
				"6476069545cd7d4a4ac12727",
				"64760e133657cf1979682e32"
		);
		User user = new User();
		user.setArticles(articles);
		assertNotNull(user);
		assertEquals(articles, user.getArticles());
	}

	@Test
	public void userHasCreatedAt() {
		LocalDateTime createdAt = LocalDateTime.now();
		User user = new User();
		user.setCreatedAt(createdAt);
		assertNotNull(user);
		assertEquals(createdAt, user.getCreatedAt());
	}

	@Test
	public void userHasModifiedAt() {
		LocalDateTime modifiedAt = LocalDateTime.now();
		User user = new User();
		user.setModifiedAt(modifiedAt);
		assertNotNull(user);
		assertEquals(modifiedAt, user.getModifiedAt());
	}

	/***  Articles  ***/
	@Test
	public void articleHasDepartment() {
		String department = "sports";
		Article article = new Article();
		article.setDepartment(department);
		assertNotNull(article);
		assertEquals(department, article.getDepartment());
	}

	@Test
	public void articleHasTitle() {
		String title = "This is a title...";
		Article article = new Article();
		article.setTitle(title);
		assertNotNull(article);
		assertEquals(title, article.getTitle());
	}

	@Test
	public void articleHasSummary() {
		String summary = "This is a summary...";
		Article article = new Article();
		article.setSummary(summary);
		assertNotNull(article);
		assertEquals(summary, article.getSummary());
	}

	@Test
	public void articleHasFullText() {
		String fullStory = "This is a the full story...";
		Article article = new Article();
		article.setFull(fullStory);
		assertNotNull(article);
		assertEquals(fullStory, article.getFull());
	}

	@Test
	public void articleHasNumberOfReads() {
		int numberOfReads = 10;
		Article article = new Article();
		article.setNumberOfReads(numberOfReads);
		assertNotNull(article);
		assertEquals(numberOfReads, article.getNumberOfReads());
	}

	@Test
	public void articleHasCreatedBy() {
		String createdBy = "John Hancock";
		Article article = new Article();
		article.setCreatedBy(createdBy);
		assertNotNull(article);
		assertEquals(createdBy, article.getCreatedBy());
	}

	@Test
	public void articleHasCreatedAt() {
		LocalDateTime createdAt = LocalDateTime.now();
		Article article = new Article();
		article.setCreatedAt(createdAt);
		assertNotNull(article);
		assertEquals(createdAt, article.getCreatedAt());
	}

	@Test
	public void articleHasModifiedAt() {
		LocalDateTime modifiedAt = LocalDateTime.now();
		Article article = new Article();
		article.setModifiedAt(modifiedAt);
		assertNotNull(article);
		assertEquals(modifiedAt, article.getModifiedAt());
	}

}
