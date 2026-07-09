from app.agents.idea_analyzer import idea_analyzer
from app.agents.planner import planner_agent
from app.agents.architecture_agent import architecture_agent
from app.agents.database_agent import database_agent
from app.agents.api_agent import api_agent
from app.agents.folder_agent import folder_agent
from app.agents.blueprint_agent import blueprint_agent
from app.agents.readme_agent import readme_agent
from app.agents.sql_agent import sql_agent
from app.agents.package_agent import package_agent


class CTOAgent:

    def execute(self, idea: str):

        # Validate Startup Idea
        analysis = idea_analyzer.analyze(idea)

        if not analysis.get("valid", False):
            return {
                "error": analysis["message"]
            }

        # Development Plan
        planner = planner_agent.plan(idea)

        # Architecture
        architecture = architecture_agent.generate(idea)

        # Database Design
        database = database_agent.generate(idea)

        # API Design
        api = api_agent.generate(idea)

        # Folder Structure
        folder = folder_agent.generate(idea)

        # Software Blueprint
        blueprint = blueprint_agent.generate(
            idea,
            planner,
            architecture,
            database,
            api,
            folder
        )

        # README
        readme = readme_agent.generate(blueprint)

        # SQL Schema
        sql = sql_agent.generate(database)

        # package.json
        package_json = package_agent.generate(idea)

        return {
            "planner": planner,
            "architecture": architecture,
            "database": database,
            "api": api,
            "folder": folder,
            "blueprint": blueprint,
            "readme": readme,
            "sql": sql,
            "package_json": package_json
        }


cto_agent = CTOAgent()