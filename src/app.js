const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
	response.json(repositories);
});

app.post('/repositories', (request, response) => {
	const { title, url, techs } = request.body;

	const repository = {
		id: uuid(),
		title: title,
		url: url,
		techs: techs,
		likes: 0,
	};

	repositories.push(repository);
	return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
	const { id } = request.params;

	const { title, url, techs } = request.body;

	const repositoryIndex = repositories.findIndex(
		(repository) => repository.id === id
	);

	if (repositoryIndex < 0) {
		return response.status(400).send();
	}

	newRepository = {
		title,
		url,
		techs,
	};

	repositories[repositoryIndex] = newRepository;
	return response.json(newRepository);
});

app.delete('/repositories/:id', (request, response) => {
	const { id } = request.params;

	const repositoryIndex = repositories.findIndex(
		(repository) => repository.id === id
	);

	if (repositoryIndex < 0) {
		return response.status(400).send();
	}

	repositories.splice(repositoryIndex, 1);
	return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
	const { id } = request.params;

	const repositoryIndex = repositories.findIndex(
		(repository) => repository.id === id
	);

	if (repositoryIndex < 0) {
    return response.status(400).send();
  }
  
  newRepository = {
    id: repositories[repositoryIndex].id,
    title: repositories[repositoryIndex].title,
    url: repositories[repositoryIndex].url,
    techs: repositories[repositoryIndex].techs,
    likes: repositories[repositoryIndex].likes + 1,
  }

  repositories[repositoryIndex] = newRepository;
  
  return response.json(newRepository);
});

module.exports = app;
