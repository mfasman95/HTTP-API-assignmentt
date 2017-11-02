require('child_process').spawnSync('npm', ['build'], { stdio: 'inherit', cwd: 'client', shell: true });
